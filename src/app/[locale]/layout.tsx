import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundEffects from "@/components/layout/BackgroundEffects";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import SplashLoader from '@/components/ui/SplashLoader';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "System-Oriented Full-Stack Engineer | Portfolio",
  description: "Building scalable systems and measurable solutions. Transparent work through GitHub activity and coding analytics.",
  keywords: ["full-stack", "engineer", "system architecture", "GitHub", "analytics"],
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<any>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <NextIntlClientProvider messages={messages}>
            <SplashLoader />
            <BackgroundEffects />
            <Navbar />
            <main className="min-h-screen lg:pl-[340px] transition-all duration-500 flex flex-col">
              {children}
              <Footer />
            </main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
