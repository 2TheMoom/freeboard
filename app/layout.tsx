import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://freeboard-six.vercel.app";
const DESCRIPTION = "Security scores for bridges & protocols across crypto.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Freeboard",
    template: "%s — Freeboard",
  },
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: "/brand/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/brand/favicon/favicon.ico",
    apple: "/brand/favicon/apple-touch-icon.png",
  },
  manifest: "/brand/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Freeboard",
    title: "Freeboard",
    description: DESCRIPTION,
    images: [{ url: "/brand/og/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freeboard",
    description: DESCRIPTION,
    images: ["/brand/og/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0E1613",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/brand/tokens/tokens.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
