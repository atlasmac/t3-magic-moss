interface ReportMapping {
  [key: string]: string | ((cfs: number) => string);
}

// TO DO: move to API
const reportMapping = {
  // salmon
  "13302500": "Report coming soon",
  // the ledge
  "12340000": "Report coming soon",
  // Missoula
  "12340500": (cfs: number) => {
    if (cfs < 2000) {
      return "Both middle and main wave at Brennan's are pretty much impossible to surf at the moment due to low water levels.";
    }
    if (cfs < 3200) {
      return "Really bad surfing conditions at the moment. You may be able to snag a ride on middle wave but you'll work hard for it. The best board for today is a foamie with fins you're ok with losing.";
    }
    if (cfs < 4500) {
      return "Poor to fair conditions. It's a tricky level but can be fun when you figure it out.";
    }
    if (cfs < 6000) {
      return "Fair conditions. A really fun fast level";
    }
    if (cfs <= 8500) {
      return "Good conditions. It's the crowd's favorite level. The wave isn't too foamy and it's easy to get in from the bank or the island.";
    }
    return "fair";
  },
  // st regis Zer0 2300 to 4500
  "12354500": (cfs: number) => {
    if (cfs < 2300) {
      return "Zero is out right now. Should come in if the levels get above 2300 CFS";
    }
    if (cfs < 3000) {
      return "Fair conditions. It's a tricky level but can be fun when you figure it out. Prepare for a bumpy wave at this level.";
    }
    if (cfs < 4500) {
      return "Prime conditions for Zero Wave. Get out there and get after it ";
    }
    if (cfs <= 6000) {
      return "A little high for zero but there is surfing to be had.";
    }
    return "Water levels are too high to be surfable at the moment, but that is a blessing. Lot's of other surfing options out there right now.";
  },
  // lochsa pipeline
  "13337000": (cfs: number) => {
    if (cfs < 4500) {
      return "Unless you want some scenic views. It's not worth the drive until levels are above 4500 cfs.";
    }
    if (cfs < 7000) {
      return "Good conditions. The left shoulder is the sweetspot right now, but it is still a fun and powerful wave.";
    }
    if (cfs < 12000) {
      return "Great conditions. It's everyone's favorite level. The whole face of the wave should be opening up. The left shoulder is the sweet spot with the right shoulder being pretty steep.";
    }
    if (cfs <= 15500) {
      return "Good conditions. It's a big green machine at this level. The wave can get kind of flat, towards 15,000 cfs. So, remeber to bring some extra volume.";
    }
    return "Too high for me and a little too flat! But if you want to get some intel on it be my guest.";
  },
  "14070500": (cfs: number) => {
    if (cfs < 650) {
      return "Too low";
    }
    if (cfs < 2100) {
      return "Good conditions. A more detailed report coming soon.";
    }
    return "Too high";
  },
} as ReportMapping;

export function getReport(siteId: string, cfs: number) {
  const report = reportMapping[siteId];
  if (typeof report === "function") {
    return report(cfs);
  }
  return report ?? "Report coming soon";
}
