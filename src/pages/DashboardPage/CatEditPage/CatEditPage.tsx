import {
	useRef,
	useState,
	useEffect,
	type ChangeEvent,
	useContext,
} from "react";
import { TextInput } from "@components/Inputs/TextInput/TextInput";
import { TextAreaInput } from "@components/Inputs/TextAreaInput/TextAreaInput";
import { Link, useParams } from "react-router-dom";
import { UseFormSetupData } from "@hooks/UseFormSetupData";
import {
	type CatFormFields,
	CatFormSchema,
	type GenderType,
} from "@interfaces/CatForm";
import { CatEditFormContext } from "@contexts/CatFormContext";
import "./CatEditPage.scss";
import { ZodError, type typeToFlattenedError } from "zod";

import UseToast from "@hooks/UseToast";
import { environment } from "@consts/environments";
import {
	type FetchCatDataResult,
	useFetchCatData,
} from "@hooks/useFetchCatData";
import { GeneralInformationSection } from "./sections/GeneralInformationSection/GeneralInformationSection";
import { AboutCatSection } from "./sections/AboutCatSection/AboutCatSection";
import { TitleVariant } from "@components/Title/Title.types";
import { Title } from "@components/Title/Title";
import { LocationSection } from "./sections/LocationSection/LocationSection";
import { ErrorScreen } from "@components/ErrorScreen/ErrorScreen";

export const CatEditPage = ({ isEditPage }: { isEditPage?: boolean }) => {
	const { baseUrl } = environment;
	const { catId } = useParams();
	const { toastSuccess, toastError } = UseToast();

	const [errors, setErrors] = useState(
		{} as typeToFlattenedError<CatFormFields>,
	);

	const { selectedFormValues, setSelectedFormValues } =
		useContext(CatEditFormContext);
	const {
		loading: fetchCatDataLoading,
		catData,
		error: fetchCatDataError,
	}: FetchCatDataResult = useFetchCatData(catId, baseUrl);

	const birthDateRef = useRef<HTMLInputElement>(null);
	const breedIdRef = useRef<HTMLSelectElement>(null);
	const catImageRef = useRef<HTMLInputElement>(null);
	const clinicIdRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const dietaryNeedsRef = useRef<HTMLTextAreaElement>(null);
	const genderRef = useRef<HTMLSelectElement>(null);
	const hasChipRef = useRef<HTMLSelectElement>(null);
	const hasLeukemiaRef = useRef<HTMLSelectElement>(null);
	const hasPassedAwayRef = useRef<HTMLSelectElement>(null);
	const medicalConditionsRef = useRef<HTMLTextAreaElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const personalityRef = useRef<HTMLTextAreaElement>(null);
	const spayedNeuteredRef = useRef<HTMLSelectElement>(null);

	const handleResetImage = () => {
		if (catImageRef?.current) {
			catImageRef.current.value = "";
		}
	};

	const formData = UseFormSetupData();

	useEffect(() => {
		if (catData) {
			setSelectedFormValues(catData);
		}
	}, [catData, setSelectedFormValues]);

	const handleCatFormSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formFields: CatFormFields = {
			birthDate: birthDateRef?.current?.value || "",
			breedId: Number(breedIdRef?.current?.value) || 0,
			clinicId: Number(clinicIdRef?.current?.value),
			description: descriptionRef?.current?.value || "",
			dietaryNeeds: dietaryNeedsRef?.current?.value || "",
			gender: (genderRef?.current?.value as GenderType) || "UNKNOWN",
			hasChip: Boolean(hasChipRef?.current?.value === "true"),
			hasLeukemia:
				hasLeukemiaRef?.current?.value === "null"
					? null
					: Boolean(hasLeukemiaRef?.current?.value === "true"),
			hasPassedAway: Boolean(hasPassedAwayRef.current?.value === "true"),
			locationId: Number(selectedFormValues.locationId),
			medicalConditions: medicalConditionsRef?.current?.value || "",
			name: nameRef?.current?.value || "",
			personality: personalityRef?.current?.value || "",
			picture: catImageRef?.current?.value || selectedFormValues.picture || "",
			spayedNeutered: Boolean(spayedNeuteredRef?.current?.value === "true"),
		};

		try {
			const validatedData = CatFormSchema.parse(formFields);

			await fetch(`${baseUrl}/cats/${catId ?? ""}`, {
				method: catId ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(validatedData),
			});

			if (catImageRef?.current?.files?.[0]) {
				const formData = new FormData();
				formData.append("picture", catImageRef?.current?.files[0]);

				await fetch(`${baseUrl}/cats/upload-image/${catId}`, {
					method: "POST",
					credentials: "include",
					body: formData,
				});
			}

			toastSuccess("Gato guardado con éxito");
		} catch (error) {
			if (error instanceof ZodError) {
				const errorObj = error.flatten();
				setErrors(errorObj);
				toastError(`Error al guardar/actualizar el gato: ${errorObj}`);
			} else {
				toastError("Error al guardar/actualizar el gato.");
			}
		}
	};

	if (fetchCatDataError) {
		return <ErrorScreen errorMessage={fetchCatDataError} />;
	}

	if (fetchCatDataLoading && isEditPage) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Link to="/dashboard" className="catPage__backLink">
				Volver
			</Link>
			<Title variant={TitleVariant.H1}>Editar Gato</Title>
			<form onSubmit={handleCatFormSubmit} className="catPage__form">
				<GeneralInformationSection
					birthDateRef={birthDateRef}
					breedIdRef={breedIdRef}
					catImageRef={catImageRef}
					errors={errors}
					formData={formData}
					genderRef={genderRef}
					handleResetImage={handleResetImage}
					hasChipRef={hasChipRef}
					hasLeukemiaRef={hasLeukemiaRef}
					hasPassedAwayRef={hasPassedAwayRef}
					nameRef={nameRef}
					selectedFormValues={selectedFormValues}
					spayedNeuteredRef={spayedNeuteredRef}
				/>
				<AboutCatSection
					descriptionRef={descriptionRef}
					personalityRef={personalityRef}
					selectedFormValues={selectedFormValues}
					errors={errors}
				/>

				<section className="catPage__healthRecordsSection">
					<h2>Historial Médico:</h2>
					<TextAreaInput
						name="dietary_needs"
						label="Dieta Específica"
						placeholder="Dieta Específica"
						ref={dietaryNeedsRef}
						defaultValue={selectedFormValues.dietaryNeeds}
					/>
					<TextAreaInput
						name="medical_conditions"
						label="Condiciones Médicas"
						placeholder="Condiciones Médicas"
						ref={medicalConditionsRef}
						defaultValue={selectedFormValues.medicalConditions}
					/>
					{/* TODO: This inputs are set temporary. Remember to change it for the real
          locationId, clinicId and picture */}
				</section>
				<LocationSection
					locations={formData.locations}
					catId={catId}
					catLocationId={selectedFormValues.locationId}
				/>
				<section className="catPage__clinicSection">
					<TextInput
						name="clinicId"
						label="Clínica Asignada"
						ref={clinicIdRef}
						placeholder="Clínica Asignada"
						defaultValue={
							selectedFormValues?.clinicId
								? String(selectedFormValues?.clinicId)
								: ""
						}
					/>
				</section>
				<section className="catPage__buttonsSection">
					<button type="button" className="button button-cancel">
						Cancelar
					</button>
					<button className="button button-save" type="submit">
						{" "}
						Guardar Cambios{" "}
					</button>
				</section>
			</form>
		</>
	);
};
