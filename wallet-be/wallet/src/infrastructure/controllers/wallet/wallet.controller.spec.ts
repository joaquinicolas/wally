import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { WalletController } from './wallet.controller';
import { Wallet } from 'src/domain/models/wallet';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { GetWalletUseCase } from 'src/usecases/getWallet.usecases';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';

describe('WalletController', () => {
  let controller: WalletController;
  let useCaseProxy: UseCaseProxy<GetWalletUseCase>;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        {
          provide: UseCasesProxyModule.GET_WALLET_USECASES_PROXY,
          useValue: {
            getInstance: jest.fn(() => ({
              execute: jest.fn(() => ({
                address: '0xabc123',
                balance: 123.45,
                isOld: false,
              })),
            })),
          },
        },
      ],
    }).compile();

    controller = module.get<WalletController>(WalletController);
    useCaseProxy = module.get<UseCaseProxy<GetWalletUseCase>>(
      UseCasesProxyModule.GET_WALLET_USECASES_PROXY,
    );
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should return wallet data when given a valid address', async () => {
    const address = '0xabc123';
    const expectedWallet: Wallet = {
      address,
      balance: 123.45,
      isOld: false,
    };

    const response = await request(app.getHttpServer())
      .get(`/wallet/${address}`)
      .expect(HttpStatus.OK);

    expect(response.body).toEqual(expectedWallet);
    expect(useCaseProxy.getInstance().execute).toHaveBeenCalledWith(address);
  });

  it('should return 500 error when given an invalid address', async () => {
    const address = 'not_an_address';

    const response = await request(app.getHttpServer())
      .get(`/wallet/${address}`)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);

    expect(response.body.message).toEqual('Invalid address');
    expect(useCaseProxy.getInstance().execute).not.toHaveBeenCalled();
  });

  it('should return 500 error when use case throws an error', async () => {
    const address = '0xabc123';
    const errorMessage = 'Something went wrong';
    jest.spyOn(useCaseProxy, 'getInstance').mockImplementationOnce(() => ({
      execute: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
      ethRepository: {
        getBalance: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
        getTransactions: jest
          .fn()
          .mockRejectedValueOnce(new Error(errorMessage)),
      },
    }));

    const response = await request(app.getHttpServer())
      .get(`/wallet/${address}`)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);

    expect(response.body.message).toEqual(errorMessage);
    expect(useCaseProxy.getInstance().execute).toHaveBeenCalledWith(address);
  });
});
