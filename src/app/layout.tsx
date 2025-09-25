import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Lunaxcode - Code at the Speed of Light | 48-Hour Landing Pages That Convert",
  description: "Get professional websites and mobile apps delivered fast. From 48-hour landing pages to full mobile applications - we help Filipino SMEs establish and grow their digital presence.",
  keywords: "web development Philippines, landing page, 48 hour delivery, AI chat widget, SME websites, mobile app development",
  authors: [{ name: "Lunaxcode" }],
  creator: "Lunaxcode",
  publisher: "Lunaxcode",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lunaxcode.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lunaxcode - Code at the Speed of Light",
    description: "Professional websites and mobile apps delivered fast for Filipino SMEs",
    url: "https://lunaxcode.com",
    siteName: "Lunaxcode",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lunaxcode - Code at the Speed of Light",
    description: "Professional websites and mobile apps delivered fast for Filipino SMEs",
    creator: "@lunaxcode",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
