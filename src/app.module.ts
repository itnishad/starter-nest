import { MiddlewareConsumer, Module, NestModule, Logger } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { WinstonLogger } from './middleware/logger.moddleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
@Module({
  imports: [UsersModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [],
  providers: [Logger, UsersService],
  exports: [UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(WinstonLogger).forRoutes('*');
  }
}
