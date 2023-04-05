export const fetchWalletData = async (address: string) => {
  try {
    const response = await fetch(`http://wallet-be/wallet/wallet/${address}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    throw error;
  }
};

// Create new class called WalletService
