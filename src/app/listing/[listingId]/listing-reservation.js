'use client';

import Button from '@/components/button';
import Calender from '@/components/inputs/calender';

const ListingReservation = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-xl
        border-neutral-200
        border-[1px]
        overflow-hidden
    "
    >
      <div
        className="
        flex items-center gap-1 p-4
    "
      >
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="text-neutral-600 font-light"> night</div>
      </div>
      <hr />
      <Calender
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button onClick={onSubmit} disabled={disabled} label="Reserve" />
      </div>
      <div
        className="
        p-4
        flex
        items-center
        justify-between
        font-semibold
        text-lg
      "
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
