import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class ConfigModule {
  static reginter(options: Record<string, any>): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'OPTIONS',
          useValue: options,
        },
      ],
    };
  }
}
