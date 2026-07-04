import React from "react";
import { Link } from "react-router-dom";
import FormattedAccountNumber from "@/components/FormattedAccountNumber";
import HiddenBalance from "@/components/HiddenBalance";
import { PATH_ROUTES } from "@/routes/paths";

interface Account {
  id: string;
  type: string;
  number: number;
  balance: number;
  status: string;
}

interface AccountGridProps {
  accounts: Account[];
}

const AccountGrid: React.FC<AccountGridProps> = ({ accounts }) => {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Danh sách tài khoản sở hữu</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 text-slate-950 shadow-xs flex flex-col justify-between min-h-[165px] relative overflow-hidden group"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {acc.type}
                </p>
                <FormattedAccountNumber
                  value={acc.number}
                  className="mt-0.5 text-slate-700 text-sm"
                />
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">
                {acc.status}
              </span>
            </div>

            <HiddenBalance balance={acc.balance} />

            <div className="h-4 flex justify-end items-end mt-2">
              <Link
                to={PATH_ROUTES.ACCOUNT.DETAIL(acc.id)}
                className="text-[11px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-200 select-none hover:underline"
              >
                Chi tiết →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountGrid;
