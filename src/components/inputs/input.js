'use client';
import { BiDollar } from 'react-icons/bi';

const Input = ({
  id = '',
  label = '',
  type = 'text',
  disabled = false,
  formatPrice = false,
  required = false,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute
        text-neutral-700
        top-5
        left-2
      "
        />
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={`
        peer
        w-full
        p-4
        pt-6
        font-light
        border-2
        rounded-md
        outline-none
        transition
        bg-white
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${formatPrice ? 'pl-9' : 'pl-4'}
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
      `}
      />
      <label
      className={`
        absolute
        text-md
        duration-150
        transform
        -translate-y-3
        top-5
        z-10
        origin-[0]
        ${formatPrice ? 'left-9' : 'left-4'}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:-translate-y-4
        peer-focus:scale-75
        ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
