'use client';
const Heading = ({ title = '', subtitle = '', center = false }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-neutral-500 mt-2 font-light">{subtitle}</p>
    </div>
  );
};

export default Heading;
