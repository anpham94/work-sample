import React from "react";
import { Link } from "react-router-dom";
import FormattedAccountNumber from "@/components/FormattedAccountNumber";
import HiddenBalance from "@/components/HiddenBalance";
import { PATH_ROUTES } from "@/routes/paths";
import { type AccountGridProps } from "@/types/prop";

const AccountGrid: React.FC<AccountGridProps> = ({ accounts }) => {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Danh sách tài khoản</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 border border-violet-500/20 text-white shadow-lg flex flex-col justify-between min-h-[165px] relative overflow-hidden group hover:border-violet-500/40 hover:shadow-violet-950/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-violet-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-violet-500/20 transition-all duration-300" />

            <div className="flex justify-between items-start z-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-violet-300/80">
                  {acc.type}
                </p>
                <FormattedAccountNumber
                  value={acc.number}
                  className="mt-0.5 text-slate-300 text-sm font-medium tracking-wide"
                />
              </div>

              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 backdrop-blur-md">
                {acc.status}
              </span>
            </div>

            <HiddenBalance
              balance={acc.balance}
              className="text-white text-xl font-bold tracking-tight my-auto z-10"
            />

            <div className="h-4 flex justify-end items-end mt-2 z-10">
              <Link
                to={PATH_ROUTES.ACCOUNT.DETAIL(acc.id)}
                className="text-[11px] font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-200 select-none hover:text-white/80 hover:underline"
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
