import { Expose, Transform } from 'class-transformer';

export class ReportDTO {
  @Expose()
  id: number;

  @Expose()
  year: number;

  @Expose()
  price: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: string;

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
