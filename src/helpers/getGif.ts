interface GifMapping {
  [key: string]: string;
}

// TO DO: derive from API
const gifMapping = {
  //brennans
  "12340500": "https://media.giphy.com/media/fUosIabrqmvvauUBgI/giphy.gif",
  //zero
  "12354500": "https://media.giphy.com/media/7rpp0H7KwqDLVF9X5r/giphy.gif",
  //pipeline
  "13337000":
    "https://media.giphy.com/media/lnchodno4E0Zw3V7VC/giphy-downsized-large.gif",
  //lunchcounter
  "13022500":
    "https://media.giphy.com/media/IrX0Ytt06auiBSV94z/giphy-downsized-large.gif",
  "14070500":
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTA4NWQwNDNlYTZmNTExYzMxN2JiZmY4YmJkY2E0Zjg0MTkwYzY4NiZjdD1n/IQRvY9GWbOJMJ6yUfk/giphy.gif",
} as GifMapping;

export function getGif(siteId: string) {
  const gifUrl = gifMapping[siteId];
  return gifUrl ?? "";
}
