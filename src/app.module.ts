import { Module } from '@nestjs/common';
import { PrismaModule } from './common/database';
import { AnimeModule } from './models/anime/anime.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/auth/jwt-auth.guard';
import { AuthModule } from './common/auth/auth.module';
import patch from './common/patch';

@Module({
  imports: [PrismaModule, AuthModule, AnimeModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor() {
    patch();
  }
}
