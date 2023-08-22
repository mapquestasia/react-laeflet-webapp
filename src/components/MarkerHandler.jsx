import L, { DivOverlay } from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Marker, Popup, useMap } from "react-leaflet";
import "./Map.css";

export const MarkerHandler = ({ markersData, isToyohashi }) => {
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

  const map = useMap();

  let markerIcon;

  return markersData?.map((marker, index) => {
    if (marker["番号"] === "") return;

    if (isToyohashi) {
      switch (marker["カテゴリ(章)"]) {
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
    } else {
      markerIcon = defaultIcon;
    }

    const getAllMarker = () => {
      map.eachLayer((layer) => {
        if (layer.options.alt === "Marker") {
          console.log(layer.getPopup());
        }
      });
    };

    return (
      <Marker
        icon={markerIcon}
        riseOnHover={true}
        key={index}
        position={[marker["緯度"], marker["経度"]]}
        eventHandlers={{
          click: (e) => {
            getAllMarker();
          },
        }}
      >
        <Popup>
          {Object.keys(marker).map((title, index) => {
            if (marker[title] === "") return;
            return (
              <p key={index}>
                <b>{title}</b>: {marker[title]}
              </p>
            );
          })}
        </Popup>
        {/*         <Popup content={"contetasdasd"}>YEY</Popup> */}
      </Marker>
    );
  });
};
