import { Rate } from './rate';

export interface Wallet {
  address: string;
  balance: number;
  exchangeRate: Rate[];
}
