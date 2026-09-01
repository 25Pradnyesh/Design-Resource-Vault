import type { Metadata } from "next";
import { Providers } from "./providers";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://design-resource-vault.local"),
  title: {
    default: "Design Resource Vault — Curated Design Resources & Visual Reference System",
    template: "%s | Design Resource Vault",
  },
  description:
    "A curated visual archive of design resources, UI/UX inspiration, tools, design systems, typography, motion patterns, and frontend engineering references.",
  keywords: [
    "design resources",
    "UI inspiration",
    "design systems",
    "web design",
    "interaction design",
    "motion design",
    "typography",
    "iconography",
    "frontend engineering",
    "creative development",
  ],
  authors: [{ name: "Design Resource Vault" }],
  creator: "Design Resource Vault",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Design Resource Vault",
    title: "Design Resource Vault — Curated Design Resources",
    description:
      "A curated visual archive of design resources, UI/UX inspiration, tools, design systems, typography, motion patterns, and frontend engineering references.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Resource Vault — Curated Design Resources",
    description:
      "A curated visual archive of design resources, UI/UX inspiration, tools, design systems, typography, motion patterns, and frontend engineering references.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-[var(--background)] text-[var(--text-primary)] min-h-screen flex flex-col">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
