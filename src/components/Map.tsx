import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { api } from "../utils/api";
import { getLatLon } from "../helpers/getLatLon";
import { getLocation } from "../helpers/getLocation";

export default function Map() {
  const icon = L.icon({
    iconUrl: "/pin.png",
    iconSize: [20, 20],
    iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -15],
  });
  const { data } = api.forecast.getSiteIds.useQuery();

  const markers = data?.map((e) => {
    const position = getLatLon(e.siteId);
    return (
      <Marker key={e.siteId} position={position} icon={icon}>
        <Popup>
          <div className="flex flex-col items-center justify-center">
            <div>
              View report for{" "}
              <Link href={`/report/${e.siteId}`}>{`${e.siteName}`}</Link>
            </div>
            <div>
              View on <Link href={getLocation(e.siteId)}>Google Maps</Link>
            </div>
          </div>
        </Popup>
      </Marker>
    );
  });

  const center: [number, number] = [46.86963076747236, -113.99602543410205];
  return (
    <div className="z-0 h-[500px] w-[90vw]">
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={false}
        className="h-[500px] w-[90vw]"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div>{markers}</div>
      </MapContainer>
    </div>
  );
}
