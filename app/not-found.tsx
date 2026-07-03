import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-6xl font-bold text-gold-400">404</h1>
      <p className="mt-4 text-xl text-ink-muted">Page not found</p>
      <Button href="/" className="mt-8">
        Back to Home
      </Button>
    </section>
  );
}
