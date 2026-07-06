import type { ProjectMedia } from "@/constants/services";
import { AnimatedSection, SectionHeading } from "@/components/shared/AnimatedSection";

type VideoSectionProps = {
  videos: ProjectMedia[];
};

function isLocalVideo(src: string) {
  return src.endsWith(".mp4") || src.endsWith(".webm");
}

export function VideoSection({ videos }: VideoSectionProps) {
  if (videos.length === 0) return null;

  return (
    <section className="mt-16">
      <AnimatedSection>
        <SectionHeading title="Project Videos" eyebrow="Videos" align="left" />
      </AnimatedSection>
      <div className="grid gap-6 md:grid-cols-2">
        {videos.map((video, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <div className="overflow-hidden rounded-2xl border border-navy-700/80 bg-white shadow-lg">
              {isLocalVideo(video.src) ? (
                <video
                  src={video.src}
                  controls
                  playsInline
                  className="aspect-video w-full bg-black object-contain"
                  preload="metadata"
                />
              ) : (
                <div className="relative aspect-video">
                  <iframe
                    src={video.src}
                    title={video.alt || `Project video ${i + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                  />
                </div>
              )}
              {video.caption && (
                <p className="border-t border-navy-700/60 p-4 text-sm text-ink-muted">{video.caption}</p>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
