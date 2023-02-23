import { useState } from "react";
import L from "leaflet";
import { getLatLon } from "../helpers/getLatLon";
import { getLocation } from "../helpers/getLocation";
import { Marker, Popup } from "react-leaflet";
import Link from "next/link";
import { api } from "../utils/api";
import { PulseLoader } from "react-spinners";
import { getConditions } from "../helpers/getConditions";

interface Props {
  siteId: string;
  siteName: string;
}

function MapMarker({ siteId, siteName }: Props) {
  const position = getLatLon(siteId);
  const location = getLocation(siteId);

  const [fetched, setFetched] = useState<boolean>(false);

  const current = api.forecast.getCurrentLevel.useQuery(
    {
      siteId,
    },
    {
      onSuccess() {
        setFetched(true);
      },
    }
  );
  const currentLevel = current.data?.observation
    .filter((e) => {
      if (e.cfs > 0) {
        return e;
      }
    })
    .pop();

  const conditions = getConditions([[currentLevel?.cfs || 0, siteId]]);

  const icon =
    conditions[0] === "Flat" || conditions[0] === "Poor"
      ? L.icon({
          iconUrl: "/redPin.png",
          iconSize: [20, 20],
          iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -15],
        })
      : L.icon({
          iconUrl: "/greenPin.png",
          iconSize: [20, 20],
          iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -15],
        });

  return (
    <>
      {current.isFetched && (
        <Marker position={position} icon={icon}>
          <Popup>
            <div className="flex flex-col items-start justify-center text-base">
              <div>
                View report for{" "}
                <Link
                  href={`/report/${siteId}`}
                  className="hover:text-sky-400"
                >{`${siteName}`}</Link>
              </div>
              <div>
                View on{" "}
                <Link href={location} className="hover:text-sky-400">
                  Google Maps
                </Link>
              </div>
              <div>
                {" "}
                {fetched ? (
                  <>Currently at {currentLevel?.cfs} cfs</>
                ) : (
                  <PulseLoader
                    color="rgb(166,173, 187)"
                    size={4}
                    speedMultiplier={0.5}
                  />
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
}

export default MapMarker;
