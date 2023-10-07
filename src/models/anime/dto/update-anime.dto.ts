import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimeDto } from './create-anime.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnimeDto extends PartialType(CreateAnimeDto) {
  @ApiProperty({ description: 'Anime favoritado?' })
  favorite?: boolean;

  @ApiProperty({ description: 'Avaliação do Anime' })
  evaluation?: boolean;
}
