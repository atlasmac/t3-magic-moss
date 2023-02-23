import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MapMarker from "./MapMarker";
import { ClipLoader } from "react-spinners";

interface Props {
  data:
    | {
        siteId: string;
        siteName: string;
      }[]
    | undefined;
  isLoading: boolean;
}

export default function Map({ data, isLoading }: Props) {
  const center: [number, number] = [46.86963076747236, -113.99602543410205];
  const markers = data?.map((e) => {
    return <MapMarker key={e.siteId} siteId={e.siteId} siteName={e.siteName} />;
  });
  return (
    <div className="z-0 h-[500px] w-[90vw]">
      {!isLoading ? (
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
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <ClipLoader
            color="rgb(166,173, 187)"
            loading
            size={100}
            speedMultiplier={0.4}
          />
        </div>
      )}
    </div>
  );
}
