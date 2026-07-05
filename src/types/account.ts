export interface AccountInfo {
  id: string;
  type: string;
  number: number;
  balance: number;
  status: "Active" | "Inactive";
}

export interface AccountTransaction {
  id: string;
  accountId: string;
  merchant: string;
  category: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  code: string;
  balanceAfter: number;
  description: string;
}

export interface AccountCompositeData {
  id: string;
  type: string;
  number: number;
  balance: number;
  status: "Active" | "Inactive";
  transactions: AccountTransaction[];
}
