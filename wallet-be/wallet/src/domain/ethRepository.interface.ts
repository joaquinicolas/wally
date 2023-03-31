import { Transaction } from './models/transaction';

export interface EthAPI {
  getBalance(address: string): Promise<number>;
  getTransactions(address: string): Promise<Transaction[]>;
}
