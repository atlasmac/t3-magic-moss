export function getLatLon(siteId: string) {
  //brennans
  if (siteId === "12340500") {
    const location: [number, number] = [46.86917959335412, -113.99768082606165];
    return location;
  }
  //zero
  if (siteId === "12354500") {
    const location: [number, number] = [47.01998473565981, -114.65679576531892];
    return location;
  }
  //pipeline
  if (siteId === "13337000") {
    const location: [number, number] = [
      46.255704238066954, -115.39950040395874,
    ];
    return location;
  }
  //lunchcounter
  if (siteId === "13022500") {
    const location: [number, number] = [43.19510736785188, -110.91488966341223];
    return location;
  }
  // salmon
  if (siteId === "13302500") {
    const location: [number, number] = [45.17637845117244, -113.8992784768452];
    return location;
  }
  const location: [number, number] = [1, 1];
  return location;
}
