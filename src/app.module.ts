import { Module } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DummyModule } from './dummy/dummy.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017/starter-nest'),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRECT'),
      }),
      inject: [ConfigService],
      global: true,
    }),
    AuthModule,
    UsersModule,
    DummyModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
