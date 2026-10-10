import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0F172A',
};

export const metadata: Metadata = {
  title: {
    default: 'Bros Group LLC | Empowering Digital Innovation & Scalable Business Solutions',
    template: '%s | Bros Group LLC'
  },
  description: 'Bros Group LLC bridges tech advancement, business growth, and strategic consultancy to power modern enterprises. Enterprise AI Agents, Custom Software Architecture, and Startup Acceleration.',
  keywords: ['Bros Group LLC', 'Software Engineering', 'Enterprise AI Agents', 'Tech Consultancy', 'Startup Pitch Deck', 'Muhammad Ali Founder'],
  authors: [{ name: 'Bros Group LLC Engineering Team' }],
  metadataBase: new URL('https://brosgroupllc.com'),
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Bros Group LLC | Official Enterprise & Tech Portal',
    description: 'Empowering Digital Innovation & Scalable Business Solutions globally.',
    url: 'https://brosgroupllc.com',
    siteName: 'Bros Group LLC',
    images: [
      {
        url: 'https://brosgroupllc.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bros Group LLC Enterprise Portal'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bros Group LLC | Enterprise Portal',
    description: 'Empowering Digital Innovation & Scalable Business Solutions.',
    images: ['https://brosgroupllc.com/images/og-image.jpg']
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-[#F8FAFC] text-[#1E293B] antialiased flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
