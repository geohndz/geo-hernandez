import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/content/site";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const sparkling = localFont({
  src: "./fonts/Sparkling.ttf",
  variable: "--font-sparkling",
  display: "swap",
});

const dm = localFont({
  src: [
    { path: "./fonts/DMSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/DMSans-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-dm",
  display: "swap",
});

const pixelify = localFont({
  src: "./fonts/PixelifySans-Regular.woff2",
  weight: "400",
  style: "normal",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image.jpg"],
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
