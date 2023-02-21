interface GifMapping {
  [key: string]: string;
}

// TO DO: derive from an s3 bucket
const gifMapping = {
  "12340500": "https://media.giphy.com/media/fUosIabrqmvvauUBgI/giphy.gif",
  "12354500": "https://media.giphy.com/media/7rpp0H7KwqDLVF9X5r/giphy.gif",
  "13337000": "https://media.giphy.com/media/lnchodno4E0Zw3V7VC/giphy-downsized-large.gif",
  "13022500": "https://media.giphy.com/media/IrX0Ytt06auiBSV94z/giphy-downsized-large.gif",
} as GifMapping;

export function getGif(siteId: string) {
  const gifUrl = gifMapping[siteId];
  return gifUrl ?? "";
}
