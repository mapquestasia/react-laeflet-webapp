import { GeoJsonWithUpdate } from "./GeoJSONWithUpdate";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

export const MarkerHandlerGeoJson = ({ markersData }) => {
  const chapterOneIcon = L.divIcon({ className: "div-icon chapter-one" });
  const chapterTwoIcon = L.divIcon({ className: "div-icon chapter-two" });
  const chapterThreeIcon = L.divIcon({ className: "div-icon chapter-three" });
  const chapterFourIcon = L.divIcon({ className: "div-icon chapter-four" });
  const chapterFiveIcon = L.divIcon({ className: "div-icon chapter-five" });

  const defaultDivIcon = L.divIcon();

  const defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  const pointToLayer = (feature, coords) => {
    let markerIcon;
    //Check if it contains Toyohashi data.
    if (!feature.properties["カテゴリ(章)"]) markerIcon = defaultIcon;
    else {
      switch (feature.properties["カテゴリ(章)"]) {
        case "【第1章】山の怪":
          markerIcon = chapterOneIcon;
          break;
        case "【第2章】川の怪":
          markerIcon = chapterTwoIcon;
          break;
        case "【第3章】まちの怪":
          markerIcon = chapterThreeIcon;
          break;
        case "【第4章】地の怪":
          markerIcon = chapterFourIcon;
          break;
        case "【第5章】磯の怪":
          markerIcon = chapterFiveIcon;
          break;
        default:
          markerIcon = defaultDivIcon;
      }
    }

    return L.marker([coords.lng, coords.lat], { icon: markerIcon });
  };

  const onEachFeature = (feature, layer) => {
    const properties = feature.properties;
    let htmlElement = "<div>\n";
    Object.keys(properties).map((title, index) => {
      htmlElement += `<p><b>${title}</b> : ${
        properties[title] ? properties[title] : "-"
      }</p>\n`;
    });
    htmlElement += "</div>";
    if (feature.properties) {
      layer.bindPopup(htmlElement);
    }
  };

  return (
    <GeoJsonWithUpdate
      data={markersData}
      pointToLayer={pointToLayer}
      onEachFeature={onEachFeature}
    />
  );
};
