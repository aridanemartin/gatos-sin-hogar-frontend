import { ReactNode } from "react";
import "./TwoColumnsLayout.css";

interface TwoColumnsLayoutProps {
	leftColumnContent: ReactNode;
	rightColumnContent: ReactNode;
	className?: string;
}

export const TwoColumnsLayout = ({
	leftColumnContent,
	rightColumnContent,
	className,
}: TwoColumnsLayoutProps) => {
	return (
		<div className={`twoColumnsLayout${className ? ` ${className}` : ""}`}>
			<div className="twoColumnsLayout__column">{leftColumnContent}</div>
			<div className="twoColumnsLayout__column">{rightColumnContent}</div>
		</div>
	);
};
