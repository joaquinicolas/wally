import { Test, TestingModule } from '@nestjs/testing';
import { Etherscan } from './etherscan';

describe('Etherscan', () => {
  let etherscan: Etherscan;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: 'API_KEY', useValue: 'your-api-key-here' },
        {
          provide: Etherscan,
          useFactory: (apiKey: string) => new Etherscan(apiKey),
          inject: ['API_KEY'],
        },
      ],
    }).compile();

    etherscan = module.get<Etherscan>(Etherscan);
  });

  describe('getBalance', () => {
    it('should return the balance for a valid Ethereum address', async () => {
      const address = '0x1234567890123456789012345678901234567890';
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              status: '1',
              message: 'OK',
              result: '864929740948334',
            }),
        }),
      ) as jest.Mock;
      const balance = await etherscan.getBalance(address);
      expect(balance).toBeGreaterThan(0);
    });
    it('throws an error if the Ethereum address is not valid', async () => {
      const invalidAddress = '0xinvalidaddress';
      await expect(etherscan.getBalance(invalidAddress)).rejects.toThrow(
        'Invalid address',
      );
    });

    it('throws an error if the API returns an error message', async () => {
      const address = '0x1234567890123456789012345678901234567890';
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({ status: '0', message: 'Invalid API Key' }),
        }),
      ) as jest.Mock;
      await expect(etherscan.getBalance(address)).rejects.toThrow(
        'Invalid API Key',
      );
    });
  });

  describe('getTransactions', () => {
    it('throws an error if the Ethereum address is not valid', async () => {
      const invalidAddress = '0xinvalidaddress';
      await expect(etherscan.getTransactions(invalidAddress)).rejects.toThrow(
        'Invalid address',
      );
    });

    it('throws an error if the API returns an error message', async () => {
      const address = '0x1234567890123456789012345678901234567890';
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              status: '0',
              message: 'Invalid API Key',
            }),
        }),
      ) as jest.Mock;
      await expect(etherscan.getTransactions(address)).rejects.toThrow(
        'Invalid API Key',
      );
    });
  });
});
