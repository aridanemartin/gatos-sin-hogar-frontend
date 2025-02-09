import {
	type CatLocationFormFields,
	CatLocationFormSchema,
} from "@interfaces/CatForm";
import type { LatLngLiteral } from "leaflet";
import {
	type ChangeEvent,
	useContext,
	useEffect,
	useState,
	type MouseEvent,
} from "react";
import { environment } from "@consts/environments";
import UseToast from "@hooks/UseToast";
import { ZodError, type typeToFlattenedError } from "zod";
import { EventsContext } from "@contexts/EventsContext";
import "./AddLocationForm.scss";

export const AddLocationForm = ({ coords }: { coords: LatLngLiteral }) => {
	const { baseUrl } = environment;
	const eventsEmitter = useContext(EventsContext);
	const { toastSuccess, toastError } = UseToast();
	const [errors, setErrors] = useState(
		{} as typeToFlattenedError<CatLocationFormFields>,
	);

	const [selectedLocation, setSelectedLocation] = useState({
		name: null,
		description: null,
		x_coord: coords.lat,
		y_coord: coords.lng,
	});

	useEffect(() => {
		setSelectedLocation({
			...selectedLocation,
			x_coord: coords.lat,
			y_coord: coords.lng,
		});
	}, [coords]);

	function handleChangeInput(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		setSelectedLocation({
			...selectedLocation,
			[event.target.name]: event.target.value,
		});
	}

	async function handleAddLocationFormSubmit(
		event: MouseEvent<HTMLButtonElement>,
	) {
		event.preventDefault();
		try {
			const validatedData = CatLocationFormSchema.parse(selectedLocation);

			await fetch(`${baseUrl}/locations`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(validatedData),
			});

			// Emit the event after successfully adding a location
			if (eventsEmitter) {
				eventsEmitter.emit("updateLocations", null);
			}

			toastSuccess("Localización guardada con éxito");
		} catch (error) {
			if (error instanceof ZodError) {
				const errorObj = error.flatten();
				setErrors(errorObj);
				toastError(errors.toString()); //todo: revisar que devuelve error.toString()
			} else {
				toastError("Error al guardar/actualizar el gato.");
			}
		}
	}

	return (
		<div className="addLocationForm">
			<h2>Añadir Nueva Localización</h2>
			<section className="addLocationForm__formSection">
				<article className="addLocationForm__nameSection">
					<label className="addLocationForm__label" htmlFor="name">
						Nombre
					</label>
					<textarea
						className="addLocationForm__input"
						id="name"
						name="name"
						placeholder="Nombre de la localización"
						onChange={handleChangeInput}
					/>
				</article>
				<article className="addLocationForm__descriptionSection">
					<label className="addLocationForm__label" htmlFor="description">Descripción</label>
					<textarea
						className="addLocationForm__textarea"
						id="description"
						name="description"
						placeholder="Descripción de la localización"
						onChange={handleChangeInput}
					/>
				</article>
			</section>
			<button
				type="button"
				className="addLocationForm__button"
				onClick={handleAddLocationFormSubmit}
			>
				Añadir Localización
			</button>
		</div>
	);
};
