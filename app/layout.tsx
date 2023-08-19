import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Navbar from '@/app/components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import ToasterProvider from './providers/ToasterProvider';
import getCurrentuser from './actions/getCurrentUser';

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone by create next app',
};

const font = Nunito({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentuser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
