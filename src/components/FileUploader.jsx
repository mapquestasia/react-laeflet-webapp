import Papa from "papaparse";
import wellknown from "wellknown";
import "./Map.css";
import { convertJsonToGeoJson } from "../Utils";

export const FileUploader = ({ setBoundariesData, setMarkersData }) => {
  const onCSVChangeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setMarkersData(convertJsonToGeoJson(results.data));
      },
    });
  };

  const onWKTChangeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (e) => {
      const geoJSON = wellknown.parse(e.target.result);
      setBoundariesData(geoJSON);
    };
  };

  return (
    <div className="file-uploader-container">
      <h3>Upload CSV or WKT File</h3>
      <label className="upload-button">
        <input
          type="file"
          name="csvFile"
          accept=".csv"
          onChange={onCSVChangeHandler}
          onClick={(e) => {
            e.target.value = null;
          }}
        />
        CSV
      </label>

      <label className="upload-button">
        <input
          type="file"
          name="wktFile"
          accept=".wkt"
          onChange={onWKTChangeHandler}
          onClick={(e) => {
            e.target.value = null;
          }}
        />
        WKT
      </label>
    </div>
  );
};
