import { forwardRef, type Ref } from "react";
import "./Modal.scss";

interface ModalProps {
	children: JSX.Element;

	className?: string;
	closeModal: () => void;
}

export const Modal = forwardRef(function Modal(
	{ children, closeModal, className }: ModalProps,
	ref: Ref<HTMLDivElement>,
) {
	return (
		<>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div className={`${className}__background`} onClick={closeModal} />
			<div className={className} ref={ref}>
				{children}
				<button
					type="button"
					className="modal__closeButton"
					onClick={closeModal}
				>
					Close
				</button>
			</div>
		</>
	);
});
