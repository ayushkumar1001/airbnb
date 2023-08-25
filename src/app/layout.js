import GlobalContainer from '@/components/global-container';
import RegisterModal from '@/components/modal/registerModal';
import Navbar from '@/components/navbar/navbar';
import { Nunito } from 'next/font/google';
import './globals.css';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb Clone',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GlobalContainer>
        <Navbar />
        <RegisterModal />
      </GlobalContainer>
      <body className={font.className}>{children}</body>
    </html>
  );
}
