import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../common/database';
import { AnimeService } from './anime.service';

describe('AnimeService', () => {
  let service: AnimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [AnimeService],
    }).compile();

    service = module.get<AnimeService>(AnimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
