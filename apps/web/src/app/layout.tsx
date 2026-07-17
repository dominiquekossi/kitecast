import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { FavoritesProvider } from "@/lib/favorites-context";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kitecast, wind and spots for kitesurfing",
  description:
    "Browse kitesurf spots, check current wind conditions, and save your favorites.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-svh bg-surface font-body text-ink antialiased">
        <FavoritesProvider>
          <SiteHeader />
          <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
