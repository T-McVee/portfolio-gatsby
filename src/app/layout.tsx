import type { Metadata } from "next";
import { getSiteMetadata } from "@/lib/content";
import "@/lib/fontawesome";
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tim McVinish",
    url: "https://tmcvee.com",
    jobTitle: "Senior Software Developer",
    description: "Tim McVinish is a senior software developer in Brisbane. He builds TypeScript, React and Azure apps, and works on AI-powered tooling.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brisbane",
      addressRegion: "Queensland",
      addressCountry: "AU",
    },
    sameAs: [
      "https://github.com/T-McVee",
      "https://www.linkedin.com/in/t-mcvee/",
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
