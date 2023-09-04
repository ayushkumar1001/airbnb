import Button from '@/components/button';
import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

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
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto bg-neutral-800/70">
          <div className="flex items-center justify-center h-full">
            <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto">
              <div
                className={`transform transition-transform duration-300 ${
                  showModal
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0'
                }`}
              >
                <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg outline-none focus:outline-none">
                  <div className="flex items-center justify-center p-5 border-b-[1px] rounded-t relative">
                    <button
                      onClick={handleClose}
                      className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                    >
                      <IoMdClose size={18} />
                    </button>
                    <div className="text-lg font-semibold">{title}</div>
                  </div>
                  <div className="p-6 flex-auto relative">{body}</div>
                  <div className="flex flex-col p-6 gap-2">
                    <div className="flex items-center gap-4 w-full">
                      {secondaryAction && secondaryActionLabel && (
                        <Button
                          outline={true}
                          label={secondaryActionLabel}
                          onClick={handleSecondaryAction}
                          disabled={disabled}
                        />
                      )}
                      <Button
                        label={actionLabel}
                        onClick={handleSubmit}
                        disabled={disabled}
                      />
                    </div>
                    {footer}
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
