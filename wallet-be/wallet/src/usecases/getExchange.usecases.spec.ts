import { Rate } from 'src/domain/models/rate';
import { GetExchangeRatesUseCase } from './getExchange.usecases';

describe('GetExchangeRatesUseCase', () => {
  let getExchangeRatesUseCase: GetExchangeRatesUseCase;

  beforeEach(() => {
    getExchangeRatesUseCase = new GetExchangeRatesUseCase();
  });

  it('should return exchange rates', async () => {
    const expectedRates: Rate[] = [
      {
        currency: 'USD',
        rate: 1710,
      },
      {
        currency: 'EUR',
        rate: 1500,
      },
    ];

    const rates = await getExchangeRatesUseCase.execute();

    expect(rates).toEqual(expectedRates);
  });
});
