import { ApiProperty } from '@nestjs/swagger';
import { TripDocument } from './trips.model';

export class Trip {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  startingDate: Date;

  @ApiProperty()
  endingDate: Date;

  @ApiProperty()
  coverImageUrl: string | null;

  @ApiProperty()
  countries: string[];

  @ApiProperty()
  days: string;

  constructor(
    id: string,
    userId: string,
    title: string,
    startingDate: Date,
    endingDate: Date,
    coverImageUrl: string,
    countries: string[],
    days: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.startingDate = startingDate;
    this.endingDate = endingDate;
    this.coverImageUrl = coverImageUrl;
    this.countries = countries;
    this.days = days;
  }

  public static fromDocument(doc: TripDocument): Trip {
    return new Trip(
      doc.id,
      doc.userId,
      doc.title,
      doc.startingDate,
      doc.endingDate,
      doc.coverImageUrl || null,
      doc.countries,
      doc.days,
    );
  }
}
