interface RangeMapping {
  [key: string]: string;
}

// TO DO: move to API
const rangeMapping = {
  // brennans
  "12340500": "3200 - 20,000 cfs",
  // zero
  "12354500": "2300 - 5500 cfs",
  // pipeline
  "13337000": "4500 - 15,500 cfs",
  // lunchcounter
  "13022500": "7000 - 12,500 cfs",
  // salmon
  "12340000": "coming soon",
  //bend green wave
  "14070500": "650 - 2100 cfs",
} as RangeMapping;

export function getRange(siteId: string) {
  const range = rangeMapping[siteId];
  return range ?? "Unknown.";
}
