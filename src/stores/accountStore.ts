import { create } from "zustand";
import accountService from "@/services/accountService";
import { type AccountInfo } from "@/types/account";
import { type AccountTransaction } from "@/types/account";

interface AccountState {
  accounts: AccountInfo[];
  currentAccount: AccountInfo | null;
  transactions: AccountTransaction[];
  loading: boolean;
  error: string | null;
  fetchAccounts: () => Promise<void>;
  fetchAccountFullDetails: (accountId: string) => Promise<void>;
  executeTransfer: (payload: TransferPayload) => Promise<boolean>;
}

interface TransferPayload {
  fromAccountId: string;
  newSourceBalance: number;
  toAccountId: string;
  newTargetBalance: number;
  amount: number;
  description: string;
}

const useAccountStore = create<AccountState>((set, get) => ({
  accounts: [],
  currentAccount: null,
  transactions: [],
  loading: false,
  error: null,

  fetchAccounts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await accountService.getAccounts();
      set({ accounts: data, loading: false });
    } catch (err) {
      console.error("Lỗi fetch accounts trong store:", err);
      set({ error: "Không thể tải danh sách tài khoản", loading: false });
    }
  },

  fetchAccountFullDetails: async (accountId: string) => {
    set({ loading: true, error: null });
    try {
      const data = await accountService.getAccountFullDetails(accountId);
      set({
        currentAccount: {
          id: data.id,
          number: data.number,
          balance: data.balance,
          type: data.type,
          status: data.status,
        },
        transactions: data.transactions || [],
        loading: false,
      });
    } catch (err) {
      console.error("Lỗi fetch full details trong store:", err);
      set({ error: "Không thể tải chi tiết tài khoản", loading: false });
    }
  },

  executeTransfer: async (payload: TransferPayload) => {
    set({ loading: true, error: null });
    const { fromAccountId, newSourceBalance, toAccountId, newTargetBalance, amount, description } =
      payload;
    const { currentAccount } = get();

    try {
      const transactionCode = `FT${Date.now().toString().slice(-6)}`;
      const today = new Date();
      const currentDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];

      const sourceTransaction: Omit<AccountTransaction, "id"> = {
        accountId: fromAccountId,
        merchant: "Chuyển khoản nội bộ",
        category: "Transfer",
        date: currentDate,
        amount: -amount,
        status: "Completed",
        code: transactionCode,
        balanceAfter: newSourceBalance,
        description: description,
      };

      const targetTransaction: Omit<AccountTransaction, "id"> = {
        accountId: toAccountId,
        merchant: "Chuyển khoản nội bộ",
        category: "Transfer",
        date: currentDate,
        amount: amount,
        status: "Completed",
        code: transactionCode,
        balanceAfter: newTargetBalance,
        description: description,
      };

      await Promise.all([
        accountService.updateAccountBalance(fromAccountId, newSourceBalance),
        accountService.updateAccountBalance(toAccountId, newTargetBalance),
        accountService.createTransaction(sourceTransaction),
        accountService.createTransaction(targetTransaction),
      ]);

      const updatedAccounts = await accountService.getAccounts();

      let updatedCurrentAccount = currentAccount;
      let updatedTransactions = get().transactions;

      if (
        currentAccount &&
        (currentAccount.id === fromAccountId || currentAccount.id === toAccountId)
      ) {
        const fullDetailData = await accountService.getAccountFullDetails(currentAccount.id);

        updatedCurrentAccount = {
          id: fullDetailData.id,
          type: fullDetailData.type,
          number: fullDetailData.number,
          balance: fullDetailData.balance,
          status: fullDetailData.status,
        };
        updatedTransactions = fullDetailData.transactions || [];
      }

      set({
        accounts: updatedAccounts,
        currentAccount: updatedCurrentAccount,
        transactions: updatedTransactions,
        loading: false,
      });

      return true;
    } catch (err) {
      console.error("Lỗi liên thông API giao dịch:", err);
      set({ error: "Giao dịch thất bại do lỗi hệ thống trên server.", loading: false });
      return false;
    }
  },
}));

export default useAccountStore;
