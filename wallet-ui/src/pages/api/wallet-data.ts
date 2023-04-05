// pages/api/wallet-data.ts

import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  address: string | string[] | undefined;
  balance: number;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const address = req.query ? req.query.address : "";

  // Fetch data using the address, for example from an external API or database.
  // Replace this with your actual data fetching logic.
  const walletData = {
    address,
    balance: 1000,
  };

  res.status(200).json(walletData);
}


