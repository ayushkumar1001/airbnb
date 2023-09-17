'use client';

import Container from '@/components/container';
import Logo from '@/components/logo';
import Search from '@/components/navbar/search';
import UserMenu from '@/components/navbar/user-menu';
import Categories from '@/components/navbar/categories';

const Navbar = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white shadow-sm z-10">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
