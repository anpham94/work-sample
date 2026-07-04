import React from "react";

interface Transaction {
  id: string;
  merchant: string;
  category: string;
  date: string;
  amount: number;
  status: string;
  code: string;
  balanceAfter: number;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const accAmountFormatter = (amount: number) => {
  return (amount > 0 ? "+" : "-") + "$" + Math.abs(amount).toFixed(2);
};

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <section className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
            Tìm kiếm từ khóa (Hạn mức dữ liệu 3 tháng)
          </label>
          <input
            type="text"
            placeholder="Nhập tên thương hiệu, mã giao dịch..."
            className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-800 focus:outline-indigo-500"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
            Loại giao dịch
          </label>
          <select className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 focus:outline-indigo-500">
            <option>Tất cả giao dịch</option>
            <option>Tiền ra (Debit)</option>
            <option>Tiền vào (Credit)</option>
          </select>
        </div>
      </div>

      <div className="p-4 space-y-2 max-h-[450px] overflow-y-auto">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Tháng 07 / 2026
        </span>

        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex justify-between items-center p-3.5 hover:bg-indigo-50/40 rounded-xl transition-all border border-slate-100 hover:border-indigo-100 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                  tx.amount > 0 ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"
                }`}
              >
                {tx.amount > 0 ? "IN" : "OUT"}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {tx.merchant}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {tx.date} •{" "}
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-600">
                    {tx.category}
                  </span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-bold tracking-tight ${tx.amount > 0 ? "text-emerald-600" : "text-slate-800"}`}
              >
                {accAmountFormatter(tx.amount)}
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                Số dư sau TX: ${tx.balanceAfter.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TransactionHistory;
