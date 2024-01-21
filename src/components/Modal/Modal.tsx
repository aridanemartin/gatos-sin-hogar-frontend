import { forwardRef, Ref } from 'react';

interface ModalProps {
  children: JSX.Element;

  className?: string;
  closeModal: () => void;
}

export const Modal = forwardRef(function Modal(
  { children, closeModal, className }: ModalProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <>
      <div className={`${className}__background`} onClick={closeModal}></div>
      <div className={className} ref={ref}>
        {children}
        <button onClick={closeModal}>Close</button>
      </div>
    </>
  );
});
