import { DynamicModule, Module } from '@nestjs/common';
import { EthAPI } from 'src/domain/ethRepository.interface';
import { UseCaseProxy } from './usecases-proxy';
import { Etherscan } from '../api/etherscan';
import { GetWalletUseCase } from 'src/usecases/getWallet.usecases';
import { GetExchangeRatesUseCase } from 'src/usecases/getExchange.usecases';
import { APIModule } from '../api/api.module';

@Module({
  imports: [APIModule],
  providers: [],
})
export class UseCasesProxyModule {
  static GET_WALLET_USECASES_PROXY = 'getWalletUsecasesProxy';
  static GET_EXCHANGE_RATE_USECASES_PROXY = 'getExchangeRateUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [Etherscan],
          provide: UseCasesProxyModule.GET_WALLET_USECASES_PROXY,
          useFactory: (externalAPI: EthAPI) =>
            new UseCaseProxy(new GetWalletUseCase(externalAPI)),
        },
        {
          provide: UseCasesProxyModule.GET_EXCHANGE_RATE_USECASES_PROXY,
          useFactory: () => {
            return new UseCaseProxy(new GetExchangeRatesUseCase());
          },
        },
      ],
      exports: [
        UseCasesProxyModule.GET_WALLET_USECASES_PROXY,
        UseCasesProxyModule.GET_EXCHANGE_RATE_USECASES_PROXY,
      ],
    };
  }
}
