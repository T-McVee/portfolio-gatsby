import type { Metadata } from "next";
import { getSiteMetadata } from "@/lib/content";
import "./globals.css";

const meta = getSiteMetadata();

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  metadataBase: new URL("https://tmcvee.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: meta.ogUrl,
    siteName: "Tim McVinish",
    title: meta.ogTitle,
    description: meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.ogTitle,
    description: meta.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
