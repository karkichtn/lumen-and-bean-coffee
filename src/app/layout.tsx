import type { Metadata } from 'next';
import './globals.css';
import { CoffeeStoreProvider } from '@/lib/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductModal from '@/components/ProductModal';
import CheckoutModal from '@/components/CheckoutModal';
import ReservationModal from '@/components/ReservationModal';
import SupabaseConfigModal from '@/components/SupabaseConfigModal';
import ToastContainer from '@/components/ToastContainer';

export const metadata: Metadata = {
  title: 'LUMEN & BEAN | Artisan Specialty Coffee Roasters & Brew Bar',
  description:
    'Directly sourced high-altitude single origin microlots and artisan signature blends. Experience our interactive Coffee Lab, precision brew guides, and fresh roasted subscription delivered to your door.',
  keywords: [
    'specialty coffee',
    'artisan roastery',
    'single origin coffee',
    'ethiopian yirgacheffe',
    'v60 brew guide',
    'coffee subscription',
    'cold brew nitro',
    'bangalore coffee shop',
    'mumbai cafe',
    'delhi coffee roastery',
  ],
  authors: [{ name: 'Lumen & Bean Roasters' }],
  openGraph: {
    title: 'LUMEN & BEAN | Artisan Specialty Coffee Roasters',
    description:
      'Directly sourced single origin microlots roasted on vintage drums and delivered fresh across India.',
    url: 'https://lumenandbean.coffee',
    siteName: 'LUMEN & BEAN',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#faf6f0] text-[#5a4537] antialiased selection:bg-[#c66624] selection:text-white">
        <CoffeeStoreProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Global Drawers, Modals & Floating Components */}
          <CartDrawer />
          <ProductModal />
          <CheckoutModal />
          <ReservationModal />
          <SupabaseConfigModal />
          <ToastContainer />
        </CoffeeStoreProvider>
      </body>
    </html>
  );
}
