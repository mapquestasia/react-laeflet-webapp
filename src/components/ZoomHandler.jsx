import L from "leaflet";
import { useMapEvents } from "react-leaflet";

export const ZoomHandler = ({ setMarkerIcon, markerIcon, isToyohashi }) => {
  const defaultMarkerSize = L.point(25, 41);
  const defaultShadowSize = L.point(41, 41);
  const defaultMarkerAnchor = L.point(12, 41);
  const defaultPopupAnchor = L.point(0, -41);

  const mapEvents = useMapEvents({
    zoomend: () => {
      if (isToyohashi) return;
      if (mapEvents.getZoom() >= 13) {
        setMarkerIcon(
          L.icon({
            ...markerIcon.options,
            iconSize: defaultMarkerSize,
            shadowSize: defaultShadowSize,
            iconAnchor: defaultMarkerAnchor,
            popupAnchor: defaultPopupAnchor,
          })
        );
      } else {
        setMarkerIcon(
          L.icon({
            ...markerIcon.options,
            iconSize: [12.5, 20],
            shadowSize: [20, 20],
            iconAnchor: [6.75, 20],
            popupAnchor: [0, -20],
          })
        );
      }
    },
  });

  return null;
};
