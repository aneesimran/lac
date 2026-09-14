import { Outfit, Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ComboPromoModal from '@/components/ComboPromoModal';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  metadataBase: new URL('https://lac-ltd.co.uk'),
  title: 'London Automotive Customs · Starlights, Ambient Lighting & Custom Parts · Chadwell Heath',
  description:
    'LAC builds OEM-grade starlight headliners, multi-zone ambient lighting and custom parts for cars in Chadwell Heath, East London. Book your install online with a £50 deposit.',
  keywords: [
    'starlight headliner',
    'ambient lighting',
    'car lighting Chadwell Heath',
    'LAC',
    'London Automotive Customs',
    'fibre optic headliner',
    'BMW digital cockpit retrofit',
    'Mercedes ambient lighting',
  ],
  authors: [{ name: 'London Automotive Customs Ltd' }],
  icons: {
    icon: 'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/33963u68_Lac%20logo.JPG',
    apple: 'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/33963u68_Lac%20logo.JPG',
  },
  openGraph: {
    title: 'Get your car done right the first time — the LAC way.',
    description:
      'Starlight headliners, multi-zone ambient lighting & custom parts. Hand-fitted in Chadwell Heath, East London. Book online with a £50 deposit.',
    url: 'https://lac-ltd.co.uk/',
    siteName: 'London Automotive Customs',
    images: [
      {
        url: 'https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/jktv5bxu_IMG_0450.jpeg',
        width: 1600,
        height: 900,
        alt: 'LAC starlight headliner install',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'London Automotive Customs · @lac.ltd',
    description:
      'Starlights, ambient lighting & custom parts. Hand-fitted in Chadwell Heath. Book online — £50 deposit.',
    images: ['https://customer-assets.emergentagent.com/job_lac-customs-booking/artifacts/jktv5bxu_IMG_0450.jpeg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${manrope.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ComboPromoModal />
      </body>
    </html>
  );
}
