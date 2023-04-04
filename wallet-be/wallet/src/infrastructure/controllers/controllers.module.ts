import { Module } from '@nestjs/common';
import { WalletController } from './wallet/wallet.controller';
import { UseCasesProxyModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  controllers: [WalletController],
  imports: [UseCasesProxyModule.register()],
})
export class ControllersModule {}
