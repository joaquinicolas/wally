import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { Wallet } from 'src/domain/models/wallet';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { GetWalletUseCase } from 'src/usecases/getWallet.usecases';
import { ApiResponse } from '@nestjs/swagger';
@Controller('wallet')
@ApiResponse({
  status: 500,
  description: 'Internal error',
})
export class WalletController {
  constructor(
    @Inject(UseCasesProxyModule.GET_WALLET_USECASES_PROXY)
    private readonly getWalletUsecasesProxy: UseCaseProxy<GetWalletUseCase>,
  ) {}

  @Get(':address')
  async getBalance(@Param('address') address: string): Promise<Wallet> {
    try {
      const wallet = await this.getWalletUsecasesProxy
        .getInstance()
        .execute(address);
      return wallet;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
