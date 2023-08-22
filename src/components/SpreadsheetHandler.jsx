import axios from "axios";
import { useEffect, useState } from "react";
import "./Spreadsheet.css";
import { convertArrayToObject, convertJsonToGeoJson } from "../Utils";

export const SpreadsheetHandler = ({ accessToken, setMarkersData }) => {
  const [spreadsheetList, setSpreadsheetList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSpreadsheetList();
  }, []);

  const getSpreadsheetList = () => {
    setIsLoading(true);
    axios
      .get(
        "https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet'",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.files);
        setSpreadsheetList(res.data.files);
      })
      .finally(() => setIsLoading(false));
  };

  const getDataFromSpreadsheet = (id) => {
    setIsLoading(true);
    axios
      .get(`https://sheets.googleapis.com/v4/spreadsheets/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const firstSheetName = res.data.sheets[0].properties.title;
        console.log(firstSheetName);
        axios
          .get(
            `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${firstSheetName}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            //console.log(res.data.values);
            const data = convertArrayToObject(res.data.values);
            //console.log(data);
            setMarkersData(convertJsonToGeoJson(data));
          })
          .finally(() => setIsLoading(false));
      });
  };

  return (
    <div className="spreadsheet-list-container">
      <button disabled={isLoading} onClick={getSpreadsheetList}>
        Fetch File
      </button>
      <h4>Spreadsheet Name</h4>
      {spreadsheetList.map((sheet, index) => {
        return (
          <div key={index} className="sheet-container">
            <p>{sheet.name}</p>
            <button
              disabled={isLoading}
              onClick={() => getDataFromSpreadsheet(sheet.id)}
            >
              Get Data
            </button>
          </div>
        );
      })}
    </div>
  );
};
