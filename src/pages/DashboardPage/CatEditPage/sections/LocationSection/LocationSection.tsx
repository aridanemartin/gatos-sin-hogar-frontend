import { MapWidget } from "@components/MapWidget/MapWidget";
import { MapModal } from "@components/MapModal/MapModal";
import type { CatLocation } from "@interfaces/CatForm";
import { type MouseEvent, useState } from "react";

interface LocationSectionProps {
	locations: CatLocation[];
	catLocationId: number | null;
	catId?: string;
}

export const LocationSection = ({
	locations,
	catLocationId,
	catId,
}: LocationSectionProps) => {
	const [modalOpen, setModalOpen] = useState(false);

	const selectedLocation = locations.find(
		(location) => location.id === catLocationId,
	);

	const selectedLocationPosition = selectedLocation
		? { lat: selectedLocation.x_coord, lng: selectedLocation.y_coord }
		: null;

	const openMapModal = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setModalOpen(true);
	};

	const closeMapModal = () => {
		setModalOpen(false);
	};

	return (
		<section className="catPage__locationSection">
			<h2>Localización:</h2>
			{selectedLocation?.name ?? "Localización desconocida"}

			{selectedLocationPosition && (
				<MapWidget
					mapPosition={selectedLocationPosition}
					handleMapPosition={() => {}}
					isMarkerDraggable={false}
					styles={{ zIndex: 0, height: "35%", width: "100%" }}
				/>
			)}
			<button type="button" onClick={openMapModal}>
				Abrir Mapa
			</button>
			{modalOpen && (
				<MapModal
					catId={catId}
					catLocationId={catLocationId}
					locations={locations}
					closeModal={closeMapModal}
				/>
			)}
		</section>
	);
};
