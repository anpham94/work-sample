import React from "react";
import FormattedAccountNumber from "@/components/FormattedAccountNumber";
import HiddenBalance from "@/components/HiddenBalance";

interface AccountDetailHeaderProps {
  accountNumber: number;
  balance: number;
}

const AccountDetailHeader: React.FC<AccountDetailHeaderProps> = ({ accountNumber, balance }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 p-6 rounded-3xl border border-indigo-800/30 shadow-xl shadow-indigo-950/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="space-y-2 relative z-10">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-widest">
          Tài khoản giao dịch
        </span>
        <div className="text-3xl font-black text-white tracking-tight font-mono">
          <FormattedAccountNumber value={accountNumber} />
        </div>
      </div>

      <div className="text-left sm:text-right relative z-10 sm:border-l sm:border-slate-800 sm:pl-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300/70 mb-1">
          Số dư khả dụng
        </p>
        <HiddenBalance
          balance={balance}
          className="text-3xl font-black text-white tracking-tight"
          containerClassName="justify-start sm:justify-end w-full"
        />
      </div>
    </div>
  );
};

export default AccountDetailHeader;
