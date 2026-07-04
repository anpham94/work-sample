import React from "react";

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
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-sm font-bold text-slate-600 cursor-pointer"
        >
          ← Quay lại
        </button>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Chi tiết tài khoản giao dịch</h2>
          <p className="text-xs text-slate-400 font-mono">
            Số tài khoản: 1029384756 • Số dư khả dụng: $5,230.50 USD
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
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

            {mockTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center p-3.5 hover:bg-indigo-50/40 rounded-xl transition-all border border-slate-100 hover:border-indigo-100 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      tx.amount > 0
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-600"
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

        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 sticky top-20">
          <div>
            <h3 className="text-base font-bold text-slate-900">Chi tiết chứng từ</h3>
            <p className="text-xs text-slate-400 mt-0.5">Thông tin định danh giao dịch điện tử</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3 font-sans text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Trạng thái</span>
              <span className="text-emerald-600 font-bold">● Thành công</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Mã giao dịch</span>
              <span className="font-mono text-slate-800 font-semibold">FT2618293012</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Thời gian</span>
              <span className="text-slate-800">2026-07-01 10:30:00</span>
            </div>
            <hr className="border-dashed border-slate-200 my-2" />
            <div className="flex justify-between">
              <span className="text-slate-400">Đơn vị thụ hưởng</span>
              <span className="font-semibold text-slate-800">Whole Foods Market</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Danh mục chi tiêu</span>
              <span className="text-slate-800">Groceries</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Nội dung thanh toán</span>
              <span className="text-slate-600 italic">Weekly grocery shopping</span>
            </div>
            <hr className="border-dashed border-slate-200 my-2" />
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 text-sm">Tổng số tiền</span>
              <span className="text-lg font-black text-slate-900">-$120.50</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium py-2 rounded-xl text-xs transition-all cursor-pointer"
          >
            Xuất hóa đơn PDF
          </button>
        </section>
      </div>
    </div>
  );
};

const accAmountFormatter = (amount: number) => {
  return (amount > 0 ? "+" : "-") + "$" + Math.abs(amount).toFixed(2);
};

export default AccountDetailPage;
