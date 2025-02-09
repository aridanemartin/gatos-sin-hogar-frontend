import type { CatFormFields } from "@interfaces/CatForm";
import type React from "react";
import type { typeToFlattenedError } from "zod";
import "./AboutCatSection.scss";
import { TextAreaInput } from "@components/Inputs/TextAreaInput/TextAreaInput";

interface AboutCatSectionProps {
	descriptionRef: React.MutableRefObject<HTMLTextAreaElement | null>;
	personalityRef: React.MutableRefObject<HTMLTextAreaElement | null>;
	selectedFormValues: CatFormFields;
	errors: typeToFlattenedError<CatFormFields>;
}

export const AboutCatSection = ({
	descriptionRef,
	personalityRef,
	selectedFormValues,
	errors,
}: AboutCatSectionProps) => {
	return (
		<section className="aboutCatSection">
			<h2>
				{selectedFormValues?.name
					? `Sobre ${selectedFormValues.name}:`
					: "Sobre el/la gato/a:"}
			</h2>
			<TextAreaInput
				name="description"
				label="Descripción"
				ref={descriptionRef}
				placeholder="Descripción"
				defaultValue={selectedFormValues.description}
				error={errors?.fieldErrors?.description?.[0]}
				numberOfRows={5}
			/>
			<TextAreaInput
				name="personality"
				label="Personalidad"
				ref={personalityRef}
				placeholder="Personalidad"
				defaultValue={selectedFormValues.personality}
				error={errors?.fieldErrors?.personality?.[0]}
			/>
		</section>
	);
};
