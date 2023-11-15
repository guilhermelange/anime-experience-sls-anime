import {
  Controller,
  Get,
  Body,
  Param,
  Req,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { Request } from 'express';
import { AnimeService } from './anime.service';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AnimeDto, AnimeGetDto, SeasonGetDto } from './dto/create-anime.dto';
@Controller('/')
@ApiTags('Animes')
@ApiSecurity('bearer')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar todos os animes' })
  @ApiResponse({
    status: 200,
    type: [AnimeGetDto],
  })
  findAll(@Req() request: Request) {
    const { id: userId } = request.user;
    return this.animeService.findAll(userId);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: AnimeDto,
  })
  @ApiOperation({ summary: 'Buscar anime por ID' })
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() request: Request,
  ) {
    const { id: userId } = request.user;
    return this.animeService.findOne(userId, id);
  }

  @Get(':id/seasons')
  @ApiResponse({
    status: 200,
    type: [SeasonGetDto],
  })
  @ApiOperation({ summary: 'Buscar temporadas por anime' })
  findOneSeasons(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.animeService.findOneSeasons(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar anime' })
  @ApiResponse({
    status: 200,
  })
  updateAnime(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() request: Request,
    @Body() animeUpdate: UpdateAnimeDto,
  ) {
    const { id: userId } = request.user;
    return this.animeService.updateOne(userId, animeUpdate, id);
  }
}
