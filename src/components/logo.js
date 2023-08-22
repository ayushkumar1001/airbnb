import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      className="hidden md:block cursor-pointer"
      src="/images/logo.png"
      alt="Logo"
      width={100}
      height={100}
    />
  );
};

export default Logo;
