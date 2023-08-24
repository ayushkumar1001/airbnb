import React from 'react';

const Button = ({
  label = '',
  onClick = () => {},
  disabled = false,
  outline = false,
  small = false,
  icon: Icon = null,
}) => {
  return (
    <button
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${
          small
            ? 'py-1 text-sm font-light border-[1px]'
            : 'py-3 text-md font-semibold border-2'
        }
        ${
          outline
            ? 'bg-white border-black text-black'
            : 'bg-rose-500 border-rose-500 text-white'
        }
    `}
    >
      {Icon && <Icon size={24} className={`absolute left-4 top-3`} />}
      {label}
    </button>
  );
};

export default Button;
