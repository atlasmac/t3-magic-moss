interface LocationMapping {
  [key: string]: string;
}

const locationMapping = {
  // brennans
  "12340500": "https://goo.gl/maps/oEpM7AprKXVw4DXz5",
  // zero
  "12354500": "https://goo.gl/maps/NUyW2mcyiWwQJxWj7",
  // pipeline
  "13337000": "https://goo.gl/maps/65rwVU1ZetpmsfPj8",
  // lunchcounter
  "13022500": "https://goo.gl/maps/eu68KcMiGrQxiVGXA",
  // salmon
  "13302500": "https://goo.gl/maps/91XgAHZL77AR47um7",
  // bend oregan greenwave
  "14070500": "https://goo.gl/maps/TssnWHy1QriEZk9N9",
} as LocationMapping;

export function getLocation(siteId: string) {
  const location = locationMapping[siteId];
  return location ?? "https://www.google.com/maps";
}
