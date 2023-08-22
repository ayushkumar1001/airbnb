import GlobalContainer from '@/components/global-container';
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
      </GlobalContainer>
      <body className={font.className}>{children}</body>
    </html>
  );
}
