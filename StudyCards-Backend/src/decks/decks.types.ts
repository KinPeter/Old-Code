import { ApiProperty } from '@nestjs/swagger';

export class DeckResource {
  constructor(id: string, userId: string, name: string, link: string, progress: string) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.link = link;
    this.progress = progress;
  }
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  progress: string;
}
