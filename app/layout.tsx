import type { Metadata } from "next";
import { IBM_Plex_Sans, Sora } from "next/font/google";
import "./globals.css";

const displayFont = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wreyouconst.com"),
  title: {
    default: "Wreyou Construction Company | Building Excellence. Delivering Trust.",
    template: "%s | Wreyou Construction Company",
  },
  description:
    "Liberian-owned construction and civil engineering firm delivering schools, clinics, roads, bridges and public buildings across Liberia since 2016.",
  keywords: [
    "Wreyou Construction",
    "construction company Liberia",
    "civil engineering Liberia",
    "roads and bridges Liberia",
    "building contractor Monrovia",
  ],
  authors: [{ name: "Wreyou Construction Company" }],
  openGraph: {
    title: "Wreyou Construction Company | Building Excellence. Delivering Trust.",
    description:
      "Liberian-owned construction and civil engineering firm delivering schools, clinics, roads, bridges and public buildings across Liberia since 2016.",
    url: "https://wreyouconst.com",
    siteName: "Wreyou Construction Company",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Wreyou Construction Company",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wreyou Construction Company | Building Excellence. Delivering Trust.",
    description:
      "Liberian-owned construction and civil engineering firm delivering schools, clinics, roads, bridges and public buildings across Liberia since 2016.",
    images: ["/Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  );
}
