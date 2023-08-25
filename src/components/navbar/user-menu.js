'use client';
import Avatar from '@/components/avatar';
import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import MenuItem from '@/components/navbar/menu-item';
import useRegisterModal from '@/hooks/useRegisterModal';
const UserMenu = () => {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <div
      className="
    relative
    "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            hidden
             md:block
                text-sm
                font-semibold
                px-4
                py-3
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
             "
        >
          Airbnb Your Home
        </div>
        <div
          onClick={toggleMenu}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
        "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
                absolute
                top-12
                right-0
                w-[40vw]
                md:w-3/4
                bg-white
                shadow-md
                rounded-xl
                overflow-hidden
                z-10
                text-sm
            "
        >
          <div
            className="
                    flex
                    flex-col
                    cursor-pointer
                "
          >
            <>
              <MenuItem label="Log In" onClick={() => {}} />
              <MenuItem label="Sign Up" onClick={registerModal.onOpen} />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
