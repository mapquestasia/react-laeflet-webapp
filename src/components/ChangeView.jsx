import { latLngBounds } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const ChangeView = ({ markersData }) => {
  const map = useMap();

  ////////// USE JSON FORMAT (OLD) ///////////
  /*   useEffect(() => {
    let markerBound = latLngBounds([]);

    if (!markers) return;

    //Find lat lng bound and fly to
    if (markers.length && markers.length > 0) {
      markers.forEach((marker) => {
        if (marker["番号"] === "") return;
        markerBound.extend([marker["緯度"], marker["経度"]]);
      });
      map.flyToBounds(markerBound, { duration: 1, padding: [25, 25] });
    }

    console.log("Change view to zoom level: " + map.getZoom());
  }, [markers]); */

  //////// USE GEOJSON FORMAT //////////
  useEffect(() => {
    let markerBound = latLngBounds([]);

    if (!markersData) return;

    if (markersData.length && markersData.length > 0) {
      markersData.forEach((marker) => [
        markerBound.extend([
          marker.geometry.coordinates[0],
          marker.geometry.coordinates[1],
        ]),
      ]);
      map.flyToBounds(markerBound, { duration: 1, padding: [25, 25] });
    }
  }, [markersData]);

  return null;
};
