export function getRange(siteId: string) {
  //brennans
  if (siteId === "12340500") {
    return "3200 - 20,000";
  }
  //zero
  if (siteId === "12354500") {
    return "2300 - 5500";
  }
  //pipeline
  if (siteId === "13337000") {
    return "4500 - 15,500";
  }
  //lunchcounter
  if (siteId === "13022500") {
    return "7000 - 12,500";
  }
  return "unavailable";
}
