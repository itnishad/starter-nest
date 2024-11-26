import { DynamicModule, Module } from '@nestjs/common';

let ROOT_STORE_OPTION;

@Module({})
export class RootCacheStoreModule {}

Module({});
export class StoreModule {
  static forRoot(options: Record<string, any>): DynamicModule {
    ROOT_STORE_OPTION = options;
    return {
      module: StoreModule,
      providers: [
        {
          provide: 'CONFIG_OPTION',
          useValue: options,
        },
      ],
    };
  }
}
