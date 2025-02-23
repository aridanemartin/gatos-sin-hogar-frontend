import "./Button.css";

export enum ButtonType {
	PRIMARY = "primary",
	SECONDARY = "secondary",
	TERTIARY = "tertiary",
}

interface ButtonProps {
	buttonType: ButtonType;
	text: string;
	onClick: () => void;
}

export const Button = ({ buttonType, text, onClick }: ButtonProps) => {
	return (
		<button type="button" className={`button ${buttonType}`} onClick={onClick}>
			{text}
		</button>
	);
};
