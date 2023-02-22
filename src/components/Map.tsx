import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { api } from "../utils/api";
import MapMarker from "./MapMarker";

export default function Map() {
  const { data } = api.forecast.getSiteIds.useQuery();
  const center: [number, number] = [46.86963076747236, -113.99602543410205];

  const markers = data?.map((e) => {
    return <MapMarker key={e.siteId} siteId={e.siteId} siteName={e.siteName} />;
  });
  return (
    <div className="z-0 h-[500px] w-[90vw]">
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={true}
        className="h-[55vh] w-[90vw]"
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
