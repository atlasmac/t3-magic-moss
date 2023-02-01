export function getReport(siteId: string, cfs: number) {
  // Missoula
  if (siteId === "12340500") {
    if (cfs < 2000) {
      return "Both middle and main wave at Brennan's are pretty much impossible to surf at the moment due to low water levels.";
    } else if (cfs >= 2000 && cfs < 3200) {
      return "Really bad surfing conditions at the moment. You may be able to snag a ride on middle wave but you'll work hard for it. The best board for today is a foamie with fins you're ok with losing.";
    } else if (cfs >= 3200 && cfs < 4500) {
      return "Poor to fair conditions. It's a tricky level but can be fun when you figure it out.";
    } else if (cfs >= 4500 && cfs < 6000) {
      return "Fair conditions. A really fun fast level";
    } else if (cfs >= 6000 && cfs <= 8500) {
      return "Good conditions. It's the crowd's favorite level. The wave isn't too foamy and it's easy to get in from the bank or the island.";
    } else {
      return "fair";
    }
  }
  //st regis Zer0 2300 to 4500
  if (siteId === "12354500") {
    if (cfs < 2300) {
      return "Zero is out right now. Should come in if the levels get up 2300 CFS";
    } else if (cfs >= 2300 && cfs < 3000) {
      return "Fair conditions. It's a tricky level but can be fun when you figure it out. Prepare for a bumpy wave at this level.";
    } else if (cfs >= 3000 && cfs < 4500) {
      return "Prime conditions for Zero Wave. Get out there and get after it ";
    } else if (cfs >= 4500 && cfs <= 6000) {
      return "A little high for zero but there is surfing to be had.";
    } else {
      return "Water levels are too high to be surfable at the moment, but that is a blessing. Lot's of other surfing options out there right now.";
    }
  }
  /// lochsa pipeline
  if (siteId === "13337000") {
    if (cfs < 4500) {
      return "Unless you want some scenic views. It's not worth the drive until levels are above 4500 cfs.";
    } else if (cfs >= 4500 && cfs < 7000) {
      return "good conditions. The left shoulder is the sweetspot right now, but it is still a fun and powerful wave.";
    } else if (cfs >= 7000 && cfs <= 12000) {
      return "Great conditions. It's everyone's favorite level. The whole face of the wave should be opening up. The left shoulder is the sweet spot with the right shoulder being pretty steep.";
    } else if (cfs >= 12000 && cfs <= 15500) {
      return "Good conditions. It's a big green machine at this level. The wave can get kind of flat, towards 15,000 cfs. So, remeber to bring some extra volume.";
    } else {
      return "Too high for me and a little too flat! But if you want to get some intel on it be my guest.";
    }
  }
  return "Poor conditions at the moment.";
}
