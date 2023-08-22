import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

import { FileUploader } from "./FileUploader";
import { ChangeView } from "./ChangeView";
import { GeoJsonWithUpdate } from "./GeoJSONWithUpdate";
import { ZoomHandler } from "./ZoomHandler";
import { MarkerHandler } from "./MarkerHandler";

import "./Map.css";
import { GoogleAuth } from "./GoogleAuth";
import { MarkerHandlerGeoJson } from "./MarkerHandlerGeoJson";

import { ExportButton } from "./ExportButton";

export const MapCanvas = () => {
  const [boundariesGeoData, setBoundariesGeoData] = useState(null);
  const [markersGeoData, setMarkersGeoData] = useState(null);

  useEffect(() => {
    setBoundariesGeoData(null);
    console.log(markersGeoData ? markersGeoData : "No data");
  }, [markersGeoData]);

  return (
    <div className="container">
      <div className="input-group">
        <FileUploader
          setBoundariesData={setBoundariesGeoData}
          setMarkersData={setMarkersGeoData}
        />
        <GoogleAuth setMarkersData={setMarkersGeoData} />
        <ExportButton data={markersGeoData} />
      </div>

      <MapContainer
        center={[35.672855, 139.817413]}
        zoom={13}
        scrollWheelZoom={true}
      >
        {/* <ZoomHandler
          setMarkerIcon={setMarkerIcon}
          markerIcon={markerIcon}
          isToyohashi={isToyohashi}
        /> */}
        {/* <MarkerHandler
          markersData={markersJsonData}
          isToyohashi={isToyohashi}
        /> */}

        <ChangeView markersData={markersGeoData?.features} />
        <LayersControl>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LayersControl.Overlay checked name="Markers">
            <MarkerHandlerGeoJson markersData={markersGeoData} />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Boundaries">
            <GeoJsonWithUpdate
              style={{ color: "blue" }}
              data={boundariesGeoData}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};
