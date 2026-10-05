import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-accent text-sm font-semibold uppercase tracking-[0.25em] text-gold-500">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold text-ink">Page not found</h1>
      <p className="mt-4 max-w-md text-ink-muted">
        This page does not exist. Return to the homepage or browse our blog and services.
      </p>
      <Button href="/" className="mt-8">
        Back to Home
      </Button>
    </section>
  );
}
