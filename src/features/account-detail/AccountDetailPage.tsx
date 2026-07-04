import React from "react";
import { Link } from "react-router-dom";
import { PATH_ROUTES } from "@/routes/paths";
import AccountDetailHeader from "@/features/account-detail/AccountDetailHeader";
import TransactionHistory from "@/features/account-detail/TransactionHistory";
import TransactionDetail from "@/features/account-detail/TransactionDetail";

const AccountDetailPage: React.FC = () => {
  const mockTransactions = [
    {
      id: "tx-01",
      merchant: "Whole Foods Market",
      category: "Groceries",
      date: "2026-07-01",
      amount: -120.5,
      status: "Completed",
      code: "FT2618293012",
      balanceAfter: 5110.0,
    },
    {
      id: "tx-02",
      merchant: "Tech Corp Inc",
      category: "Salary",
      date: "2026-06-30",
      amount: 3500.0,
      status: "Completed",
      code: "FT2618266491",
      balanceAfter: 5230.5,
    },
    {
      id: "tx-03",
      merchant: "Starbucks Coffee",
      category: "Dining Out",
      date: "2026-06-28",
      amount: -4.75,
      status: "Completed",
      code: "FT2618211029",
      balanceAfter: 1730.5,
    },
  ];

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

      <AccountDetailHeader accountNumber={1029384756} balance={5230.5} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <TransactionHistory transactions={mockTransactions} />
        <TransactionDetail />
      </div>
    </div>
  );
};

export default AccountDetailPage;
