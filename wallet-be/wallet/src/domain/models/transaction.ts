export interface Transaction {
  hash: string;
  blockNumber: number;
  from: string;
  to: string;
  value: number;
  timeStamp: number;
}
