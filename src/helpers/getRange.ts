export function getRange(siteId: string) {
  //brennans
  if (siteId === "12340500") {
    return "3200 - 20,000 cfs";
  }
  //zero
  if (siteId === "12354500") {
    return "2300 - 5500 cfs";
  }
  //pipeline
  if (siteId === "13337000") {
    return "4500 - 15,500 cfs";
  }
  //lunchcounter
  if (siteId === "13022500") {
    return "7000 - 12,500 cfs";
  }
  return "This is a brand spanking new wave, so get out there and gather some intel.";
}
