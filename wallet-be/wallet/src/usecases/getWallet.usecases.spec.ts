import { GetWalletUseCase } from './getWallet.usecases';

describe('GetWalletUseCases', () => {
  const mockEthRepository = {
    getBalance: jest.fn(),
    getTransactions: jest.fn(),
  };

  const useCase = new GetWalletUseCase(mockEthRepository);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return wallet information', async () => {
    const address = '0x1234567890abcdef';
    const balance = 123.45;
    const lastTx = {
      hash: '0xabc123',
      blockNumber: 123456,
      from: '0x0987654321abcdef',
      to: '0x1234567890abcdef',
      value: 1.23,
    };

    mockEthRepository.getBalance.mockResolvedValueOnce(balance);
    mockEthRepository.getTransactions.mockResolvedValueOnce(lastTx);

    const result = await useCase.execute(address);

    expect(result).toEqual({
      address,
      balance,
      isOld: false,
    });
    expect(mockEthRepository.getBalance).toHaveBeenCalledTimes(1);
    expect(mockEthRepository.getBalance).toHaveBeenCalledWith(address);
    expect(mockEthRepository.getTransactions).toHaveBeenCalledTimes(1);
    expect(mockEthRepository.getTransactions).toHaveBeenCalledWith(address);
  });

  it('should return wallet information with isOld flag', async () => {
    const address = '0x1234567890abcdef';
    const balance = 123.45;

    mockEthRepository.getBalance.mockResolvedValueOnce(balance);
    mockEthRepository.getTransactions.mockResolvedValueOnce(null);

    const result = await useCase.execute(address);

    expect(result).toEqual({
      address,
      balance,
      isOld: true,
    });
    expect(mockEthRepository.getBalance).toHaveBeenCalledTimes(1);
    expect(mockEthRepository.getBalance).toHaveBeenCalledWith(address);
    expect(mockEthRepository.getTransactions).toHaveBeenCalledTimes(1);
    expect(mockEthRepository.getTransactions).toHaveBeenCalledWith(address);
  });

  it('should throw an error if repository method throws an error', async () => {
    const address = '0x1234567890abcdef';

    mockEthRepository.getBalance.mockRejectedValueOnce(
      new Error('Failed to get balance'),
    );

    await expect(useCase.execute(address)).rejects.toThrow(
      'Failed to get balance',
    );
    expect(mockEthRepository.getBalance).toHaveBeenCalledTimes(1);
    expect(mockEthRepository.getBalance).toHaveBeenCalledWith(address);
    expect(mockEthRepository.getTransactions).not.toHaveBeenCalled();
  });
});
