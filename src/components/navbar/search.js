'use client';
import { BiSearch } from 'react-icons/bi';
const Search = () => {
  return (
    <div
      className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
    "
    >
      <div
        className="
            flex
            items-center
            justify-between
        "
      >
        <div
          className="
                text-sm
                px-6
                font-semibold
            "
        >
          Anywhere
        </div>
        <div
          className="
          hidden
          md:block
                text-sm
                px-6
                font-semibold
                border-x-[1px]
                flex-1
                text-center
            "
        >
          Any Week
        </div>
        <div
          className="
                text-sm
                pl-6
                pr-2
                text-gray-600
                flex
                items-center
                gap-3
            "
        >
          <div className="hidden md:block">Add Guests</div>
          <div
            className="
            p-2
            rounded-full
            text-white
            bg-rose-500
          "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
