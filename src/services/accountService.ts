import apiService from "@/services/apiService";
import { type AccountInfo } from "@/types/account";
import { type AccountCompositeData, type AccountTransaction } from "@/types/account";

const accountService = {
  getAccounts: (): Promise<AccountInfo[]> => {
    return apiService.get<AccountInfo[]>("/accounts");
  },
  getAccountFullDetails: (accountId: string): Promise<AccountCompositeData> => {
    return apiService.get<AccountCompositeData>(`/accounts/${accountId}?_embed=transactions`);
  },
  updateAccountBalance: async (accountId: string, newBalance: number): Promise<AccountInfo> => {
    return await apiService.patch<AccountInfo>(`/accounts/${accountId}`, {
      balance: newBalance,
    });
  },
  createTransaction: async (
    transactionData: Omit<AccountTransaction, "id">
  ): Promise<AccountTransaction> => {
    return await apiService.post<AccountTransaction>("/transactions", {
      id: `TX-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      ...transactionData,
    });
  },
};

export default accountService;
