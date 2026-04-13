import { ReactNode } from "react";
import "./SideImageText.css";

interface SideImageTextProps {
	imageSrc: string;
	imageAlt: string;
	imagePosition?: "left" | "right";
	className?: string;
	children: ReactNode;
}

export const SideImageText = ({
	imageSrc,
	imageAlt,
	imagePosition = "left",
	className,
	children,
}: SideImageTextProps) => {
	return (
		<div
			className={`sideImageText sideImageText--image-${imagePosition}${className ? ` ${className}` : ""}`}
		>
			<img className="sideImageText__image" src={imageSrc} alt={imageAlt} />
			<div className="textContainer">{children}</div>
		</div>
	);
};
