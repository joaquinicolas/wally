import { EthAPI } from 'src/domain/ethRepository.interface';
import { isEthereumAddress } from '../../utils/validator';
import { Transaction } from 'src/domain/models/transaction';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Etherscan implements EthAPI {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async getBalance(address: string): Promise<number> {
    if (!isEthereumAddress(address)) {
      throw new Error('Invalid address');
    }

    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${this.apiKey}`;

    try {
      const response = await fetch(url);

      if (response.status && response.status !== 200) {
        throw new Error(`Failed to get transactions for address ${address}`);
      }

      const data = await response.json();
      if (data.status === '0') {
        throw new Error(data.message);
      }
      const balanceWei = parseInt(data.result);
      const balanceEther = balanceWei / 10 ** 18;

      return balanceEther;
    } catch (err) {
      const errorMessage =
        err.message || `Failed to get balance for address ${address}`;
      throw new Error(errorMessage);
    }
  }

  public async getTransactions(address: string): Promise<Transaction> {
    if (!isEthereumAddress(address)) {
      throw new Error('Invalid address');
    }
    const oneYearAgo = Math.floor(Date.now() / 1000) - 31536000;
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${this.apiKey}&timestamp=${oneYearAgo}`;
    try {
      const response = await fetch(url);
      if (response.status && response.status !== 200) {
        throw new Error(`Failed to get transactions for address ${address}`);
      }

      const data = await response.json();
      if (data.status === '0') {
        throw new Error(data.message);
      }
      const transactions = data.result.map((tx: any) => ({
        hash: tx.hash,
        blockNumber: parseInt(tx.blockNumber),
        from: tx.from,
        to: tx.to,
        value: parseInt(tx.value) / 10 ** 18,
        timeStamp: parseInt(tx.timeStamp),
      }));
      return transactions?.length > 0 ? transactions[0] : null;
    } catch (err) {
      const errorMessage =
        err.message || `Failed to get transactions for address ${address}`;
      throw new Error(errorMessage);
    }
  }
}
