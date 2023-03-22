interface RiverMapping {
  [key: string]: {
    values?: [number, string][];
    other?: string;
  };
}

// TO DO: this information should be derived from the API / database.
const riverConditionMapping = {
  //brennans
  "12340500": {
    values: [
      [2000, "Flat"],
      [3200, "Poor to impossible"],
      [4500, "Poor to fair"],
      [6000, "Fair to good"],
      [8500, "Good conditions"],
    ],
    other: "Fair to good",
  },
  //salmon whitewater
  "13302500": {
    other: "TBD",
  },
  // the ledge blackfoot
  "12340000": {
    values: [
      [3500, "Flat"],
      [5500, "Fair to Good"],
    ],
    other: "Fair",
  },
  //st regis Zer0 2300 to 4500
  "12354500": {
    values: [
      [2300, "Flat"],
      [3000, "Fair"],
      [4500, "Good"],
      [6000, "Fair"],
    ],
    other: "Poor",
  },
  /// lochsa pipeline
  "13337000": {
    values: [
      [4500, "Flat"],
      [7000, "Good"],
      [12000, "Great"],
      [15500, "Good"],
    ],
    other: "Too high",
  },
  //bend green wave
  "14070500": {
    values: [
      [650, "Flat"],
      [2100, "Good"],
    ],
    other: "Too high",
  },
} as RiverMapping;

function getCondition(locationKey: string, currentRiverLevel: number) {
  const riverValues = riverConditionMapping[locationKey];

  if (riverValues == null) {
    return "Poor";
  }
  if (!riverValues.values) {
    return "TBD";
  }

  const index = riverValues.values.findIndex(
    (riverLevel) => currentRiverLevel < riverLevel[0]
  );
  if (index == -1) {
    return riverValues.other;
  }
  return riverValues.values[index]?.[1];
}

export function getConditions(arr: [number, string][]) {
  return arr.map((el) => {
    const locationKey = el[1];
    const riverLevel = el[0];
    return getCondition(locationKey, riverLevel);
  });
}
