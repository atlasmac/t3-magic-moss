export function getLocation(siteId: string) {
  //brennans
  if (siteId === "12340500") {
    return "https://goo.gl/maps/oEpM7AprKXVw4DXz5";
  }
  //zero
  if (siteId === "12354500") {
    return "https://goo.gl/maps/NUyW2mcyiWwQJxWj7";
  }
  //pipeline
  if (siteId === "13337000") {
    return "https://goo.gl/maps/65rwVU1ZetpmsfPj8";
  }
  //lunchcounter
  if (siteId === "13022500") {
    return "https://goo.gl/maps/eu68KcMiGrQxiVGXA";
  }
  // salmon
  if (siteId === "13302500") {
    return "https://goo.gl/maps/91XgAHZL77AR47um6";
  }

  return "https://www.google.com/maps";
}
