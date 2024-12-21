import { Module, DynamicModule } from '@nestjs/common';

type Options = {
  useFectory: () => string;
};

@Module({})
export class DummyModule {
  static forRoot(options: Options): DynamicModule {
    return {
      module: DummyModule,
      imports: [],
      controllers: [],
      providers: [
        {
          provide: 'OPTIONS',
          useValue: options,
        },
        {
          provide: 'DBURI',
          useFactory: (options: Options) => {
            return options.useFectory();
          },
          inject: ['OPTIONS'],
        },
      ],
      exports: ['DBURI'],
    };
  }
}
