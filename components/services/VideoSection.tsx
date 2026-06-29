import type { ProjectMedia } from "@/constants/services";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

type VideoSectionProps = {
  videos: ProjectMedia[];
};

export function VideoSection({ videos }: VideoSectionProps) {
  if (videos.length === 0) return null;

  return (
    <section className="mt-16">
      <AnimatedSection>
        <h2 className="font-display text-2xl font-bold text-white mb-8">
          Project Videos
        </h2>
      </AnimatedSection>
      <div className="grid gap-6 md:grid-cols-2">
        {videos.map((video, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <div className="overflow-hidden rounded-xl border border-navy-700">
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
              {video.caption && (
                <p className="p-4 text-sm text-white/60">{video.caption}</p>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
