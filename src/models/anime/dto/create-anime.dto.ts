import { ApiProperty } from '@nestjs/swagger';
import { Anime } from '@prisma/client';

export class CreateAnimeDto implements Anime {
  id: string;
  name: string;
  description: string;
  cover_file: string;
  parental_rating: number;
  start_date: Date;
  created_at: Date;
  updated_at: Date;
  image_file: string;
  playlist_link: string;
  favorite?: boolean;
  evaluation?: boolean;
}

export class AnimeGetDto {
  @ApiProperty({ description: 'Id do Anime' })
  id: string;

  @ApiProperty({ description: 'Nome do Anime' })
  name: string;

  @ApiProperty({ description: 'Descrição do Anime' })
  description: string;

  @ApiProperty({ description: 'Imagem de Cover do Anime' })
  cover_file: string;

  @ApiProperty({ description: 'Imagem do Anime' })
  image_file: string;

  @ApiProperty({ description: 'Link da Playlist do Anime' })
  playlist_link: string;

  @ApiProperty({ description: 'Ano de lançamento do Anime' })
  start_year: number;

  @ApiProperty({ description: 'Avaliação do usuário para o Anime' })
  evaluation: boolean;

  @ApiProperty({ description: 'Favoritado?' })
  favorite: boolean;

  @ApiProperty({ description: 'Média de avaliação do Anime' })
  evaluation_media: number;

  @ApiProperty({ description: 'Quantidade de Temporadas do Anime' })
  season_count: number;
}

class EpisodeDto {
  @ApiProperty({ description: 'Nome do Episódio' })
  name: string;

  @ApiProperty({ description: 'Descripção do Episódio' })
  description: string;

  @ApiProperty({ description: 'Link do Episódio' })
  link: string;

  @ApiProperty({ description: 'Duração do Episódio' })
  duration: number;

  @ApiProperty({ description: 'Número do Episódio' })
  number: number;
}
class SeasonDto {
  @ApiProperty({ description: 'Nome da Temporada' })
  name: string;

  @ApiProperty({ description: 'Número da Temporada' })
  number: number;

  @ApiProperty({
    type: () => [EpisodeDto],
    description: 'Episódios da Temporada',
  })
  episode: EpisodeDto[];
}
export class AnimeDto extends AnimeGetDto {
  @ApiProperty({ type: () => [SeasonDto], description: 'Temporadas do Anime' })
  season: SeasonDto[];
}

class EpisodeGetDto {
  @ApiProperty({ description: 'Descrição do Episódio' })
  description: string;

  @ApiProperty({ description: 'Duração do Episódio' })
  duration: number;

  @ApiProperty({ description: 'Link do Episódio' })
  link: string;

  @ApiProperty({ description: 'Nome do Episódio' })
  name: string;

  @ApiProperty({ description: 'Número do Episódio' })
  number: number;

  @ApiProperty({ description: 'Número da Temporada do Episódio' })
  seasonNumber: number;

  @ApiProperty({ description: 'Id do Anime do Episódio' })
  seasonAnimeId: string;
}
export class SeasonGetDto {
  @ApiProperty({ description: 'Id do Anime' })
  animeId: string;

  @ApiProperty({ description: 'Descrição da Temporada' })
  description: string;

  @ApiProperty({ description: 'Nome da Temporada' })
  name: string;

  @ApiProperty({ description: 'Número da Temporada' })
  number: number;

  @ApiProperty({
    type: () => [EpisodeGetDto],
    description: 'Episódios do Anime',
  })
  episode: EpisodeGetDto[];
}
