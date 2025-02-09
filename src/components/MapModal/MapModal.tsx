import { useRef, useEffect } from "react";
import { LocationsList } from "@components/LocationsList/LocationsList";
import { MapWidget } from "@components/MapWidget/MapWidget";
import { Modal } from "@components/Modal/Modal";
import type { LatLngExpression, LatLngLiteral } from "leaflet";
import { useState } from "react";
import type { CatLocation } from "@interfaces/CatForm";
import { UseDefaultCatLocation } from "@hooks/UseDefaultCatLocation";
import "./MapModal.scss";
import type { Map as LeafletMap } from "leaflet";
import { AddLocationForm } from "@components/AddLocationForm/AddLocationForm";

interface MapModalProps {
	catId: string | undefined;
	catLocationId: number | null;
	locations: CatLocation[];
	closeModal: () => void;
}

export const MapModal = ({
	catId,
	catLocationId,
	locations,
	closeModal,
}: MapModalProps) => {
	const locationsModalRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<LeafletMap | null>(null);

	const defaultLocation = UseDefaultCatLocation(
		Number(catId),
		locations,
		catLocationId,
	);
	const [currentMapPosition, setCurrentMapPosition] =
		useState<LatLngExpression>(defaultLocation);

	const handleMapPosition = (position: LatLngExpression) => {
		setCurrentMapPosition(position);
	};

	useEffect(() => {
		if (mapRef.current) {
			handleMapPosition(defaultLocation);
			mapRef?.current?.flyTo(defaultLocation, 18, { duration: 2 });
		}
	}, [defaultLocation]);

	return (
		<Modal className="mapModal" ref={locationsModalRef} closeModal={closeModal}>
			<div className="mapModal__content">
				<MapWidget
					mapPosition={currentMapPosition}
					handleMapPosition={handleMapPosition}
					ref={mapRef}
				/>
				<AddLocationForm coords={currentMapPosition as LatLngLiteral} />
				<LocationsList
					currentMapPosition={currentMapPosition}
					handleMapPosition={handleMapPosition}
					data={locations}
					mapRef={mapRef}
				/>
			</div>
		</Modal>
	);
};
