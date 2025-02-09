import { useRef, useMemo, forwardRef, type Ref } from "react";
import type {
	LatLngExpression,
	Marker as MarkerType,
	Map as LeafletMapType,
} from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
	mapPosition: LatLngExpression;
	handleMapPosition: (coords: LatLngExpression) => void;
	isMarkerDraggable?: boolean;
	styles?: React.CSSProperties;
}

export const MapWidget = forwardRef(function MapWidget(
	{
		mapPosition,
		handleMapPosition,
		isMarkerDraggable = true,
		styles = { height: "35%", width: "100%" },
	}: MapProps,
	ref: Ref<LeafletMapType>,
) {
	const markerRef = useRef<MarkerType>(null);

	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current;
				if (marker != null) handleMapPosition(marker.getLatLng());
			},
		}),
		[markerRef, handleMapPosition],
	);

	return (
		<MapContainer
			center={mapPosition}
			zoom={15}
			preferCanvas
			style={styles}
			ref={ref}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<Marker
				ref={markerRef}
				position={mapPosition}
				draggable={isMarkerDraggable}
				eventHandlers={eventHandlers}
			/>
		</MapContainer>
	);
});
