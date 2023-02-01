export function getGif(siteId: string) {
  //brennans
  if (siteId === "12340500") {
    return "https://media.giphy.com/media/fUosIabrqmvvauUBgI/giphy.gif";
  }
  //zero
  if (siteId === "12354500") {
    return "https://media.giphy.com/media/7rpp0H7KwqDLVF9X5r/giphy.gif";
  }
  //pipeline
  if (siteId === "13337000") {
    return "https://media.giphy.com/media/lnchodno4E0Zw3V7VC/giphy-downsized-large.gif";
  }
  //lunchcounter
  if (siteId === "13022500") {
    return "https://media.giphy.com/media/IrX0Ytt06auiBSV94z/giphy-downsized-large.gif";
  }
  return "https://media.giphy.com/media/fUosIabrqmvvauUBgI/giphy.gif";
}
