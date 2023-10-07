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
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
@Controller('/')
@ApiTags('Users  -  /users')
@ApiSecurity('bearer')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar todos os animes' })
  findAll(@Req() request: Request) {
    const { id: userId } = request.user;
    return this.animeService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar anime por ID' })
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() request: Request,
  ) {
    const { id: userId } = request.user;
    return this.animeService.findOne(userId, id);
  }

  @Get(':id/seasons')
  @ApiOperation({ summary: 'Buscar temporadas por anime' })
  findOneSeasons(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.animeService.findOneSeasons(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar anime' })
  updateAnime(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() request: Request,
    @Body() animeUpdate: UpdateAnimeDto,
  ) {
    const { id: userId } = request.user;
    return this.animeService.updateOne(userId, animeUpdate, id);
  }
}
