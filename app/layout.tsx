import { Cormorant_Garamond, Great_Vibes, Manrope } from "next/font/google";
import { siteConfig } from "@/content/site-config";
import { buildRootMetadata } from "./root-metadata";
import "./globals.css";

export const metadata = buildRootMetadata();

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.locale.language}
      className={`${manrope.variable} ${cormorantGaramond.variable} ${greatVibes.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
