import React from "react";
import L from "leaflet";
import { getLatLon } from "../helpers/getLatLon";
import { getLocation } from "../helpers/getLocation";
import { Marker, Popup } from "react-leaflet";
import Link from "next/link";

interface Props {
  siteId: string;
  siteName: string;
}

function MapMarker({ siteId, siteName }: Props) {
  const position = getLatLon(siteId);
  const location = getLocation(siteId);
  const icon = L.icon({
    iconUrl: "/pin.png",
    iconSize: [20, 20],
    iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -15],
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <div className="flex flex-col items-center justify-center">
          <div>
            View report for{" "}
            <Link href={`/report/${siteId}`}>{`${siteName}`}</Link>
          </div>
          <div>
            View on <Link href={location}>Google Maps</Link>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default MapMarker;
