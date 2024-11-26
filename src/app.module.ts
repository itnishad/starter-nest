import { MiddlewareConsumer, Module, NestModule, Logger } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { WinstonLogger } from './middleware/logger.moddleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(WinstonLogger).forRoutes('*');
  }
}
