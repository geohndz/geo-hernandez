import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans, Pixelify_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/content/site";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const sparkling = localFont({
  src: "./fonts/Sparkling.ttf",
  variable: "--font-sparkling",
  display: "swap",
});

const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.legalName }],
  keywords: [
    "product designer",
    "interaction designer",
    "UX design",
    "prototypes",
    "design systems",
    "AI",
    "accessibility",
    "visual design",
  ],
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sparkling.variable} ${dm.variable} ${pixelify.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-fg">
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
    </html>
  );
}
