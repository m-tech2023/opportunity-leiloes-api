export class AccessLogDto {
  id?: string;
  userId?: string;
  ip?: string;
  geolocalization?: string;
  accessedAt?: Date;
  browser?: string;
}
