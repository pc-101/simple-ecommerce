import './globals.css';
import type { ReactNode } from 'react';
import NavBar from '@/components/NavBar';
import Providers from './providers';

export const metadata = {
  title: 'Storefront',
  description: 'E-Commerce Storefront',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NavBar />
          <main className="container mx-auto px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
