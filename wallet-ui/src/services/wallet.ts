export const fetchWalletData = async (address: string) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/wallet/wallet/${address}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
  }
};

export const fetchRates = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/wallet/exchange`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching rates:", error);
  }
};
