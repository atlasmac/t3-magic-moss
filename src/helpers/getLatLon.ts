interface LatLonMapping {
  [key: string]: [number, number];
}

// TO DO: move to API
const latLonMapping = {
  //brennans
  "12340500": [46.86917959335412, -113.99768082606165],
  //zero
  "12354500": [47.01998473565981, -114.65679576531892],
  //ledge
  "12340000": [46.919677, -113.672323],
  //pipeline
  "13337000": [46.255704238066954, -115.39950040395874],
  //lunchcounter
  "13022500": [43.19510736785188, -110.91488966341223],
  //salmon
  "13302500": [45.17637845117244, -113.8992784768452],
  //bend greenwave
  "14070500": [44.05019286374418, -121.3214163731525],
} as LatLonMapping;

export function getLatLon(siteId: string) {
  const latLon = latLonMapping[siteId];
  return latLon ?? [1, 1];
}
