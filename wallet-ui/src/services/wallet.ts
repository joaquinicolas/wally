export const fetchWalletData = async (address: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/wallet/wallet/${address}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    throw error;
  }
};

export const fetchRates = async () => {
  try {
    const response = await fetch(`http://localhost:3000/wallet/exchange`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw error;
  }
};
