import React from "react";
import Papa from "papaparse";
import { convertGeoJsonToJson } from "../Utils";

export const ExportButton = ({ data }) => {
  const handleExport = () => {
    const json = convertGeoJsonToJson(data);

    console.log(json);

    const csv = Papa.unparse(json, { header: true, encoding: "utf-8" });

    console.log(csv);

    //Prepending a BOM sequence so that Chrome detects it as UTF.
    var BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([BOM, csv]);
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = "MapExport.csv";
    link.href = url;
    link.click();
    alert("File Exported");
  };

  return (
    <button className="export-button" onClick={handleExport}>
      Export
    </button>
  );
};
