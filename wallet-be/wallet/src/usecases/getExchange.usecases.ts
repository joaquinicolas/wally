import { Rate } from 'src/domain/models/rate';

export class GetExchangeRatesUseCase {
  async execute(): Promise<Rate[]> {
    return [
      {
        currency: 'USD',
        rate: 1710,
      },
      {
        currency: 'EUR',
        rate: 1500,
      },
    ];
  }
}
