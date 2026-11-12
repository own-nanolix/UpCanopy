import { Lexend_Exa, Red_Hat_Display } from 'next/font/google';
import './globals.css';
import Providers from '@/components/site/Providers';
import ExportMode from '@/components/site/ExportMode';

// The case study names no typefaces. These are the closest free matches to what it shows:
// Lexend Exa for the wide logotype voice, Red Hat Display for the light text voice.
const wide = Lexend_Exa({ variable: '--font-lexend-exa', subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' });
const text = Red_Hat_Display({ variable: '--font-red-hat', subsets: ['latin'], weight: ['300', '400', '500', '700'], display: 'swap' });

export const metadata = {
  title: { template: '%s · UpCanopy', default: 'UpCanopy' },
  description: 'UpCanopy brand system: logo, colour, type, motion, product and the physical brand.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${wide.variable} ${text.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <ExportMode />
      </body>
    </html>
  );
}
