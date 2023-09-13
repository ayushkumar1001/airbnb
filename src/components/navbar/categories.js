'use client';
import CategoryBox from '@/components/category-box';
import Container from '@/components/container';
import { usePathname, useSearchParams } from 'next/navigation';
import { BsSnow } from 'react-icons/bs';
import { FaSkiing } from 'react-icons/fa';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This category belongs to beach',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This category belongs to windmills',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This category belongs to modern',
  },
  {
    label: 'Country Side',
    icon: TbMountain,
    description: 'This category belongs Country Side',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This category belongs Pools',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This category belongs Islands',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This category belongs Lake',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This category belongs Skiing',
  },
  {
    label: 'Castle',
    icon: GiCastle,
    description: 'This category belongs Castle',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This category belongs Camping',
  },
  {
    label: 'Artic',
    icon: BsSnow,
    description: 'This category belongs Artic',
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This category belongs Cave',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This category belongs Desert',
  },
  {
    label: 'Barn',
    icon: GiBarn,
    description: 'This category belongs Barn',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This category belongs Lux',
  },
];
const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathName = usePathname();

  if (pathName !== '/') {
    return null;
  }

  return (
    <Container>
      <div
        className="
      pt-4
      flex
      items-center
      justify-between
      overflow-x-auto
    "
      >
        {categories.map((item, index) => {
          return (
            <CategoryBox
              key={index}
              label={item.label}
              Icon={item.icon}
              selected={category === item.label}
            />
          );
        })}
      </div>
    </Container>
  );
};
export default Categories;
