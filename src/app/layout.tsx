import type { Metadata } from "next";
import { getSiteMetadata } from "@/lib/content";
import "./globals.css";

const meta = getSiteMetadata();

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    url: meta.ogUrl,
    title: meta.ogTitle,
    description: meta.description,
    images: [meta.ogImage],
  },
  icons: {
    icon: "/images/favicon.png",
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
