import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne, Outfit, Orbitron, Rajdhani } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { SITE } from "@/constants/site";
import { buildMetadata, buildOrganizationJsonLd } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  title: SITE.tagline,
  description: SITE.description,
  path: "/",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = buildOrganizationJsonLd();

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${syne.variable} ${outfit.variable} ${orbitron.variable} ${rajdhani.variable}`}
    >
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <ScrollProgress />
        <Header />
        <main className="min-h-screen pt-[72px]">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
