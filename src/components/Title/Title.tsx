import "./Title.scss";
import type { TitleVariant } from "./Title.types";

interface TitleProps {
	variant: TitleVariant;
	children: React.ReactNode;
	className?: string;
}

export const Title: React.FC<TitleProps> = ({
	variant,
	className,
	children,
}) => {
	const Tag = variant;
	return (
		<Tag className={`titleComponent ${variant} ${className}`}>{children}</Tag>
	);
};
