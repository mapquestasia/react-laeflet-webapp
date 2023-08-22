import { useEffect, useState } from "react";
import { SpreadsheetHandler } from "./SpreadsheetHandler";
import "./Spreadsheet.css";

export const GoogleAuth = ({ setMarkersData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = new URLSearchParams(window.location.hash).get(
      "#access_token"
    );

    if (token) {
      setIsLoggedIn(true);
      setAccessToken(token);
      console.log("Login with token " + token);
    }
  }, []);

  const handleLogin = () => {
    const clientId =
      "156456069516-li3livflubskvq7kres768qrmn21tgtf.apps.googleusercontent.com";
    const redirectUri = window.location.href;

    const scope =
      "https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.readonly";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
    window.location.href = authUrl;
  };

  const logout = () => {
    window.location = "/";
    setIsLoggedIn(false);
  };

  return (
    <div className="google-file-container">
      {!isLoggedIn ? (
        <div className="login-container">
          <h3>Login to Google</h3>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="file-container">
          <SpreadsheetHandler
            accessToken={accessToken}
            setMarkersData={setMarkersData}
          />
          <button className="logout-button" onClick={logout}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};
