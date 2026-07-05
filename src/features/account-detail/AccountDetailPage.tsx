import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PATH_ROUTES } from "@/routes/paths";
import AccountDetailHeader from "@/features/account-detail/AccountDetailHeader";
import TransactionHistory from "@/features/account-detail/TransactionHistory";
import TransactionDetail from "@/features/account-detail/TransactionDetail";
import useAccountStore from "@/stores/accountStore";
import { type AccountTransaction } from "@/types/account";

const AccountDetailPage: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const activeAccountId = accountId || "acc-01";

  const { currentAccount, transactions, fetchAccountFullDetails } = useAccountStore();
  const [selectedTx, setSelectedTx] = useState<AccountTransaction | null>(null);

  useEffect(() => {
    fetchAccountFullDetails(activeAccountId);
  }, [activeAccountId, fetchAccountFullDetails]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <Link
          to={PATH_ROUTES.ACCOUNT.OVERVIEW}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          ← Quay lại
        </Link>
      </div>

      {currentAccount && (
        <AccountDetailHeader
          accountNumber={currentAccount.number}
          balance={currentAccount.balance}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <TransactionHistory
          transactions={transactions}
          selectedTxId={selectedTx?.id || null}
          onSelectTx={(tx: AccountTransaction) => setSelectedTx(tx)}
        />

        <TransactionDetail selectedTx={selectedTx} />
      </div>
    </div>
  );
};

export default AccountDetailPage;
