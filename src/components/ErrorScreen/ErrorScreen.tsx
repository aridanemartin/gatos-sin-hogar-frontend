import type { ReactNode } from "react";
import "./ErrorScreen.scss";
import catNotFoundImage from "@assets/icons/catNotFound.webp";
import { useNavigate } from "react-router";

interface ErrorScreenProps {
	errorCode?: string;
	errorMessage: string;
	button?: ReactNode;
}

export const ErrorScreen = ({
	errorMessage,
	errorCode,
	button,
}: ErrorScreenProps) => {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate("/");
	};

	const renderButton = () => {
		if (button) {
			return button;
		}
		return (
			<button
				type="button"
				className="errorScreen__button"
				onClick={handleGoHome}
			>
				Volver al inicio
			</button>
		);
	};

	return (
		<div className="errorScreen">
			<img
				src={catNotFoundImage}
				alt="Error Cat Not Found"
				className="errorScreen__image"
			/>
			{errorCode && <p className="errorScreen__errorCode">{errorCode}</p>}
			<p className="errorScreen__message">{errorMessage}</p>
			{renderButton()}
		</div>
	);
};
