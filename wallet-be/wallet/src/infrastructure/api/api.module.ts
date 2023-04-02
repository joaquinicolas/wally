import { DynamicModule, Module } from '@nestjs/common';
import { Etherscan } from './etherscan';

@Module({
  imports: [],
  providers: [],
  exports: [Etherscan],
})
export class ApiModule {
  static register(config: any): DynamicModule {
    return {
      module: ApiModule,
      providers: [
        ApiModule,
        {
          provide: 'API_KEY',
          useValue: config.apiKey,
        },
      ],
      exports: [Etherscan],
    };
  }
}
