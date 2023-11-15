import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../common/database/prisma.module';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { Request } from 'express';
import { UpdateAnimeDto } from './dto/update-anime.dto';

describe('AnimeController', () => {
  let controller: AnimeController;
  let service: AnimeService;
  const mockRequest = { user: { id: '1' } } as Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [AnimeController],
      providers: [AnimeService],
    }).compile();

    controller = module.get<AnimeController>(AnimeController);
    service = module.get<AnimeService>(AnimeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of animes', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([] as any[]);

      const result = await controller.findAll(mockRequest);

      expect(result.length).toEqual(0);
      expect(service.findAll).toBeCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith(mockRequest.user.id);
    });
  });

  describe('findOne', () => {
    it('should return an anime', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce({} as any);

      const result = await controller.findOne('1', mockRequest);

      expect(result).toEqual({});
      expect(service.findOne).toBeCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith('1', mockRequest.user.id);
    });
  });

  describe('findOneSeasons', () => {
    it('should return an anime seasons and episodes', async () => {
      jest.spyOn(service, 'findOneSeasons').mockResolvedValueOnce([] as any[]);

      const result = await controller.findOneSeasons('1');

      expect(result).toEqual([]);
      expect(service.findOneSeasons).toBeCalledTimes(1);
      expect(service.findOneSeasons).toHaveBeenCalledWith('1');
    });
  });

  describe('updateAnime', () => {
    it('should update an anime', async () => {
      jest.spyOn(service, 'updateOne').mockResolvedValueOnce('');

      const updateAnimeDto = {
        evaluation: true,
      } as UpdateAnimeDto;
      const result = await controller.updateAnime(
        '1',
        mockRequest,
        updateAnimeDto,
      );

      expect(result).toEqual('');
      expect(service.updateOne).toBeCalledTimes(1);
      expect(service.updateOne).toHaveBeenCalledWith(
        mockRequest.user.id,
        updateAnimeDto,
        '1',
      );
    });
  });
});
