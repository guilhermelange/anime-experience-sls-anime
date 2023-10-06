import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../common/database/prisma.module';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';

describe('AnimeController', () => {
  let controller: AnimeController;
  let service: AnimeService;

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
});
