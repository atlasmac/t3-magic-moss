export function getConditions(arr: [number, string][]) {
  return arr.map((el) => {
    //brennans
    if (el[1] === "12340500") {
      if (el[0] < 2000) {
        return "Flat";
      } else if (el[0] >= 2000 && el[0] < 3200) {
        return "Poor to impossible";
      } else if (el[0] >= 3200 && el[0] < 4500) {
        return "Poor to fair";
      } else if (el[0] >= 4500 && el[0] < 6000) {
        return "Fair to good";
      } else if (el[0] >= 6000 && el[0] <= 8500) {
        return "Good conditions";
      } else {
        return "Fair to good";
      }
    }
    //st regis Zer0 2300 to 4500
    if (el[1] === "12354500") {
      if (el[0] < 2300) {
        return "Flat";
      } else if (el[0] >= 2300 && el[0] < 3000) {
        return "Fair";
      } else if (el[0] >= 3000 && el[0] < 4500) {
        return "Good";
      } else if (el[0] >= 4500 && el[0] <= 6000) {
        return "Fair";
      } else {
        return "Poor";
      }
    }
    /// lochsa pipeline
    if (el[1] === "13337000") {
      if (el[0] < 4500) {
        return "Flat";
      } else if (el[0] >= 4500 && el[0] < 7000) {
        return "Good";
      } else if (el[0] >= 7000 && el[0] <= 12000) {
        return "Great";
      } else if (el[0] >= 12000 && el[0] <= 15500) {
        return "Good";
      } else {
        return "Too high";
      }
    }
    return "Poor";
  });
}
