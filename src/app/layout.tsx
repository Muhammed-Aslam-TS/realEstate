import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { FavoritesProvider } from '@/context/FavoritesContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'LuxeHaven | Luxury Real Estate & Coastal Estates',
  description: 'Explore premier luxury villas, skyview penthouses, and architectural estates. Bespoke real estate advisory and off-market listings.',
  keywords: 'luxury real estate, penthouses, mansions, oceanfront villas, luxury homes for sale',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} dark scroll-smooth`} suppressHydrationWarning>
      <body
        className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-amber-500 selection:text-slate-950"
        suppressHydrationWarning
      >
        <FavoritesProvider>
          <Navbar />
          <main className="flex-1 pt-24">{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
