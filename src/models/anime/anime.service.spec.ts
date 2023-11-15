import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule, PrismaService } from '../../common/database';
import { AnimeService } from './anime.service';
import { UpdateAnimeDto } from './dto/update-anime.dto';

describe('AnimeService', () => {
  let service: AnimeService;
  let prisma: PrismaService;
  let anime: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [AnimeService],
    }).compile();

    service = module.get<AnimeService>(AnimeService);
    prisma = module.get<PrismaService>(PrismaService);

    anime = {
      id: '1',
      name: 'Anime',
      description: '',
      cover_file: '',
      parental_rating: 10,
      start_date: new Date(),
      image_file: '',
      playlist_link: '',
      anime_user_evaluation: [
        {
          evaluation: true,
          userId: '1',
          animeId: '1',
        },
      ],
      anime_user_favorites: [],
      season: [],
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of animes', async () => {
      prisma.anime.findMany = jest.fn().mockResolvedValueOnce([anime] as any[]);

      const response = await service.findAll('1');
      expect(response[0].name).toEqual('Anime');
      expect(prisma.anime.findMany).toBeCalledTimes(1);
    });

    it('should apply format', async () => {
      const animeFormatted = service.loadAnimeResponse('1', anime);

      expect(animeFormatted.name).toEqual('Anime');
    });

    it('should return a error', async () => {
      prisma.anime.findMany = jest.fn().mockResolvedValueOnce([] as any[]);

      expect(service.findAll('1')).rejects.toThrowError();
      expect(prisma.anime.findMany).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return one anime', async () => {
      prisma.anime.findUnique = jest.fn().mockResolvedValueOnce(anime as any);

      const response = await service.findOne('1', '1');
      expect(response.name).toEqual('Anime');
      expect(prisma.anime.findUnique).toBeCalledTimes(1);
    });

    it('should return a error', async () => {
      prisma.anime.findUnique = jest.fn().mockResolvedValueOnce(null);

      expect(service.findOne('1', '0')).rejects.toThrowError();
      expect(prisma.anime.findUnique).toBeCalledTimes(1);
    });
  });

  describe('findOneSeasons', () => {
    it('should return one anime seasons', async () => {
      prisma.season.findMany = jest.fn().mockResolvedValueOnce([{}] as any[]);

      const response = await service.findOneSeasons('1');
      expect(response.length).toEqual(1);
      expect(prisma.season.findMany).toBeCalledTimes(1);
    });
  });

  describe('updateOne', () => {
    it('should update an anime evaluation and favorite', async () => {
      prisma.anime.findUnique = jest.fn().mockResolvedValueOnce(anime as any);
      prisma.user.findUnique = jest
        .fn()
        .mockResolvedValueOnce({ id: '1' } as any);

      prisma.animeUserFavorites.upsert = jest.fn().mockResolvedValueOnce('');
      prisma.animeUserFavorites.delete = jest.fn().mockResolvedValueOnce('');
      prisma.animeUserEvaluation.upsert = jest.fn().mockResolvedValueOnce('');

      const animeUpdate = {
        evaluation: true,
        favorite: true,
      } as UpdateAnimeDto;

      const response = await service.updateOne('1', animeUpdate, '1');
      expect(response).toEqual('');
      expect(prisma.anime.findUnique).toBeCalledTimes(1);
      expect(prisma.user.findUnique).toBeCalledTimes(1);
      expect(prisma.animeUserEvaluation.upsert).toBeCalledTimes(1);
      expect(prisma.animeUserFavorites.upsert).toBeCalledTimes(1);
      expect(prisma.animeUserFavorites.delete).toBeCalledTimes(0);
    });

    it('should update an anime evaluation and favorite', async () => {
      prisma.anime.findUnique = jest.fn().mockResolvedValueOnce(anime as any);
      prisma.user.findUnique = jest
        .fn()
        .mockResolvedValueOnce({ id: '1' } as any);

      prisma.animeUserFavorites.upsert = jest.fn().mockResolvedValueOnce('');
      prisma.animeUserFavorites.delete = jest.fn().mockResolvedValueOnce('');
      prisma.animeUserEvaluation.upsert = jest.fn().mockResolvedValueOnce('');

      const animeUpdate = {
        favorite: false,
      } as UpdateAnimeDto;

      const response = await service.updateOne('1', animeUpdate, '1');
      expect(response).toEqual('');
      expect(prisma.animeUserFavorites.delete).toBeCalledTimes(1);
    });

    // it('should return a error', async () => {
    //   prisma.anime.findUnique = jest.fn().mockResolvedValueOnce(null);

    //   expect(service.findOne('1', '0')).rejects.toThrowError();
    //   expect(prisma.anime.findUnique).toBeCalledTimes(1);
    // });
  });
});
