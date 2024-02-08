import { forwardRef, Ref } from 'react';
import './Modal.scss';

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
        <button className="modal__closeButton" onClick={closeModal}>
          Close
        </button>
      </div>
    </>
  );
});
