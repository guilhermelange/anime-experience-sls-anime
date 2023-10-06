import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import authConfig from './auth';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: authConfig.jwt.secret,
      signOptions: { expiresIn: authConfig.jwt.expiresIn },
    }),
  ],
  controllers: [JwtStrategy],
  providers: [],
})
export class AuthModule {}
