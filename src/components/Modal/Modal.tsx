import { forwardRef, Ref } from 'react';

interface ModalProps {
  children: JSX.Element;
  width: string;
  height: string;
  closeModal: () => void;
}

export const Modal = forwardRef(function Modal(
  { children, width, height, closeModal }: ModalProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      style={{
        width,
        height,
        border: '1px solid black',
        padding: '10px',
        position: 'fixed',
        left: '50%',
        right: '-50%'
      }}
    >
      {children}
      <button onClick={closeModal}>Close</button>
    </div>
  );
});
