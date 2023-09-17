import ToasterProvider from '@/app/providers/ToasterProvider';
import GlobalContainer from '@/components/global-container';
import LoginModal from '@/components/modal/loginModal';
import RegisterModal from '@/components/modal/registerModal';
import Navbar from '@/components/navbar/navbar';
import { Nunito } from 'next/font/google';
import './globals.css';
import getCurrentUser from '@/app/actions/getCurrentUser';
import RentModal from '@/components/modal/rentModal';
import SearchModal from '@/components/modal/searchModal';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb Clone',
};

export default async function RootLayout({ children }) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <GlobalContainer>
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
        </GlobalContainer>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
