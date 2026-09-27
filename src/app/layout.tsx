import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Londrina_Solid } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const display = Londrina_Solid({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "900"],
  display: "swap",
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Da Tina – Pizzeria Popolare a Vigone (TO) · Prenota un tavolo",
  description:
    "Pizzeria a Vigone, in Via Bosca 12A. " +
    site.claim +
    ". Aperti da mercoledì a domenica, 18:30 – 22:30. Scopri il menù e prenota un tavolo.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: site.name,
    title: `${site.name} · Vigone (TO)`,
    description: `${site.claim}. ${site.subtitle}.`,
    url: "/",
  },
  // Niente indicizzazione finché non si collega il dominio: si abilita con ALLOW_INDEXING=true.
  robots: process.env.ALLOW_INDEXING === "true" ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0e5a2b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
