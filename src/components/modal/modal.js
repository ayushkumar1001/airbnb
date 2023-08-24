'use client';
import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '@/components/button';

const Modal = ({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  title = '',
  body = '',
  footer = '',
  actionLabel = '',
  disabled = false,
  secondaryAction,
  secondaryActionLabel = '',
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [secondaryAction, disabled]);
  return (
    <>
      {!showModal ? null : (
        <div
          className="
        flex
        items-center
        justify-center
        fixed
        inset-0
        z-50
        overflow-x-hidden
        overflow-y-auto
        outline-none
        focus:outline-none
        bg-neutral-800/70
    "
        >
          <div
            className="
                    relative
                    w-full
                    md:w-4/6
                    lg:w-3/6
                    xl:w-2/5
                    my-6
                    mx-auto
                    h-full
                    md:h-auto
                "
          >
            <div
              className={`
                translate
                duration-300
                h-full
                ${showModal ? 'translate-y-0' : 'translate-y-full'}
                ${showModal ? 'opacity-100' : 'opacity-0'}
            `}
            >
              <div
                className={`
                    translate
                    h-full
                    md:h-auto
                    border-0
                    rounded-lg
                    shadow-lg
                    relative
                    flex
                    flex-col
                    w-full
                    bg-white
                    outline-none
                    focus:outline-none
                `}
              >
                <div
                  className="
                    flex
                    items-center
                    justify-center
                    p-5
                    border-b-[1px]
                    rounded-t
                    relative
                    "
                >
                  <button
                    onClick={handleClose}
                    className="
                        p-1
                        border-0
                        hover:opacity-70
                        transition
                        absolute
                        left-9
                    "
                  >
                    <IoMdClose size={18} />
                  </button>
                  <div className="text-lg font-semibold">{title}</div>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">{body}</div>
                {/*footer*/}
                <div
                  className={`
                        flex
                        flex-col
                        p-6
                        gap-2`}
                >
                  <div className="flex items-center gap-4 w-full">
                    <Button
                      label={actionLabel}
                      onClick={handleSubmit}
                      disabled={disabled}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
