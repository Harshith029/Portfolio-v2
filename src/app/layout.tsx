import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — AI Engineer & Full-Stack Developer`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Harshith Pali", "AI engineer", "full-stack developer", "AI agent security", "MCP",
    "LoRA", "PyTorch", "FastAPI", "Postgres", "entity resolution", "Next.js", "Hyderabad",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "harshith.dev",
    title: `${site.name} — AI Engineer & Full-Stack Developer`,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    creator: "@HPali3286",
    title: `${site.name} — AI Engineer & Full-Stack Developer`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "AI Engineer & Full-Stack Developer",
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Mahindra University" },
  sameAs: site.socials.map((s) => s.href),
  knowsAbout: [
    "AI agent security", "Machine learning", "LoRA fine-tuning", "Entity resolution",
    "Postgres", "FastAPI", "AWS", "TypeScript", "React",
  ],
  award: [
    "Winner, AI for Bharat 2026 (Government of Karnataka)",
    "Top 300 globally, AWS 10,000 AI Ideas Challenge",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${geistMono.variable}`}>
      <body className="bg-base font-sans text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
