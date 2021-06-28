import React from "react";
import useGeoLocation from "./useGeoLocation";
import './styles.css';

const LocationServer = () => {
  const { error, lat, long } = useGeoLocation();
  return (
    <div>
      <h1>Where am I?</h1>
      <div className="coordinates">
        {!error ? (
          <>
            <div className="geo-coord-display">
              <div className="geo-label">Latitude</div>
              <div className="geo-value">{lat}</div>
            </div>
            <div className="geo-coord-display">
              <div className="geo-label">Longitude</div>
              <div className="geo-value">{long}</div>
            </div>
          </>
        ) : (
          <h2 id="error">Location data could not be fetched!</h2>
        )}
      </div>
    </div>
  );
};

export default LocationServer;
