import { EthAPI } from 'src/domain/ethRepository.interface';
import { Wallet } from 'src/domain/models/wallet';

export class GetWalletUseCase {
  constructor(private readonly ethRepository: EthAPI) {}

  async execute(address: string): Promise<Wallet> {
    const balance = await this.ethRepository.getBalance(address);
    const lastTx = await this.ethRepository.getTransactions(address);

    return {
      address,
      balance,
      isOld: lastTx ? false : true,
    };
  }
}
