import {
	type ChangeEvent,
	type Ref,
	forwardRef,
	useEffect,
	useState,
} from "react";
import "./ImageInput.scss";
import { CatIcon } from "@assets/icons/svg/CatIcon";

export const ImageInput = forwardRef(function ImageInput(
	{
		name,
		label,
		defaultImage,
		onReset,
	}: {
		name: string;
		defaultImage?: string;
		label: string;
		onReset: () => void;
	},
	ref: Ref<HTMLInputElement>,
) {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (defaultImage) {
			setPreviewUrl(defaultImage);
		}
	}, [defaultImage]);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event?.target?.files?.[0];
		if (file) {
			if (
				file.type !== "image/jpeg" &&
				file.type !== "image/png" &&
				file.type !== "image/webp"
			) {
				// Change this to 'image/webp' to only allow WebP images
				setError("Por favor, sube una imagen en formato WebP.");
				setPreviewUrl("");
				onReset();
				return;
			}
			setPreviewUrl(URL.createObjectURL(file));
			setError("");
		}
	};

	const handleResetImage = () => {
		setPreviewUrl("");
		setError("");
		onReset();
	};

	const renderPreviewImage = () => {
		if (previewUrl) {
			return <img src={previewUrl} alt="Vista previa" />;
		}

		return <CatIcon />;
	};

	return (
		<div className="imageInput">
			<label className="imageInput__label" htmlFor={name}>
				{label}

				<div className="imageInput__preview">{renderPreviewImage()}</div>
			</label>
			<div className="imageInput__buttons">
				<div className="imageInput__input">
					<label htmlFor="file">Añadir imagen +</label>
					<input
						id="file"
						type="file"
						name={name}
						ref={ref}
						onChange={handleFileChange}
					/>
				</div>
				{previewUrl && (
					<button type="reset" onClick={handleResetImage}>
						Borrar
					</button>
				)}
			</div>
			{error && <p>{error}</p>}
		</div>
	);
});
