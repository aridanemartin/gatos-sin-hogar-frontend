import { forwardRef, Ref } from 'react';

interface ModalProps {
  children: JSX.Element;
  width: string;
  height: string;
}

export const Modal = forwardRef(function Modal(
  { children, width, height }: ModalProps,
  ref: Ref<HTMLDialogElement>
) {
  const handleClick = () => {
    if (ref && 'current' in ref && ref.current) ref.current.close();
  };

  return (
    <dialog ref={ref} style={{ width, height }}>
      {children}
      <button onClick={handleClick}>Close</button>
    </dialog>
  );
});
