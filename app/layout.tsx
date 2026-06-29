import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { SITE } from "@/constants/site";
import { buildMetadata, buildOrganizationJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Header />
        <main className="min-h-screen pt-[72px]">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
