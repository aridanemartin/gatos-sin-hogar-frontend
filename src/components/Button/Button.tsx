import "./Button.css";

export enum ButtonType {
	PRIMARY = "primary",
	SECONDARY = "secondary",
	TERTIARY = "tertiary",
}

interface ButtonProps {
	text: string;
	onClick: () => void;
	buttonType?: ButtonType;
	variant?: "primary" | "secondary" | "tertiary";
	className?: string;
}

export const Button = ({ text, onClick, buttonType, variant, className }: ButtonProps) => {
	const variantClass = variant ?? buttonType ?? ButtonType.PRIMARY;
	return (
		<button type="button" className={`button ${variantClass}${className ? ` ${className}` : ""}`} onClick={onClick}>
			{text}
		</button>
	);
};
