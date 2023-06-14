export interface App{
  _id: string,
  name: string,
  price: number,
  downloadSize: number;
  description: string;
  photos: string[],
  numOfDownloads?: number;
}
