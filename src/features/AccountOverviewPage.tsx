import React from "react";
import FormattedAccountNumber from "@/components/FormattedAccountNumber";
import HiddenBalance from "@/components/HiddenBalance";

const AccountOverviewPage: React.FC = () => {
  const mockAccounts = [
    {
      id: "acc-01",
      type: "Tài khoản giao dịch",
      number: 102938475612,
      balance: 5230000,
      status: "Active",
    },
    {
      id: "acc-02",
      type: "Tài khoản giao dịch",
      number: 102999884432,
      balance: 12500000,
      status: "Active",
    },
    {
      id: "acc-03",
      type: "Tài khoản gửi tiết kiệm",
      number: 564738291099,
      balance: 245000000,
      status: "Active",
    },
    {
      id: "acc-04",
      type: "Tài khoản tín dụng Visa",
      number: 4111222233334444,
      balance: -4500000,
      status: "Active",
    },
    {
      id: "acc-05",
      type: "Tài khoản vay",
      number: 998877665511,
      balance: -150000000,
      status: "Active",
    },
    {
      id: "acc-06",
      type: "Tài khoản vay",
      number: 998811223344,
      balance: -750000000,
      status: "Active",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">Danh sách tài khoản sở hữu</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mockAccounts.map((acc) => {
            return (
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
                  <span className="text-[11px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none pointer-events-none">
                    Chi tiết →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <section className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Mô phỏng chuyển khoản</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Chuyển tiền nhanh giữa các tài khoản thanh toán của bạn
            </p>
          </div>

          <div className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Tài khoản nguồn
              </label>
              <select className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-slate-700 text-sm focus:outline-indigo-500">
                <option>Tài khoản giao dịch (*5612) - 5,230,000 VND</option>
                <option>Tài khoản giao dịch (*4322) - 12,500,000 VND</option>
                <option>Tài khoản gửi tiết kiệm (*1099) - 245,000,000 VND</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Tài khoản đích
              </label>
              <select className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-slate-700 text-sm focus:outline-indigo-500">
                <option>Tài khoản giao dịch (*4322) - 12,500,000 VND</option>
                <option>Tài khoản giao dịch (*5612) - 5,230,000 VND</option>
                <option>Tài khoản gửi tiết kiệm (*1099) - 245,000,000 VND</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Số tiền cần chuyển (VND)
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-indigo-500 text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Nội dung chuyển khoản
              </label>
              <input
                type="text"
                placeholder="Chuyen tien noi bo"
                className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-indigo-500 text-slate-900"
              />
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3 rounded-xl text-sm transition-all shadow-xs cursor-pointer"
          >
            Thực hiện chuyển tiền
          </button>
        </section>

        <section className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Phân tích hành vi chi tiêu</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Dữ liệu phân tích dựa trên lịch sử hoạt động
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Thu Nhập (Tháng này)
              </span>
              <span className="text-xl font-extrabold text-emerald-600 block mt-1">
                +42,000,000 VND
              </span>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[75%]" />
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Chi Tiêu (Tháng này)
              </span>
              <span className="text-xl font-extrabold text-slate-800 block mt-1">
                -14,205,000 VND
              </span>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-indigo-600 h-full w-[33%]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Xu hướng theo danh mục
              </span>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">🛒 Nhu yếu phẩm</span>
                    <span className="font-bold">45%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1 rounded-full">
                    <div className="bg-amber-500 h-full w-[45%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">⚡ Hóa đơn dịch vụ</span>
                    <span className="font-bold">30%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1 rounded-full">
                    <div className="bg-blue-500 h-full w-[30%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">🍿 Giải trí & Ăn uống</span>
                    <span className="font-bold">25%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1 rounded-full">
                    <div className="bg-rose-500 h-full w-[25%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Thương hiệu chi tiêu nhiều nhất
              </span>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 bg-slate-200 rounded-md flex items-center justify-center font-bold">
                      W
                    </span>
                    <span className="font-semibold text-slate-700">Whole Foods Market</span>
                  </div>
                  <span className="font-bold text-slate-900">6,800,000 VND</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 bg-slate-200 rounded-md flex items-center justify-center font-bold">
                      A
                    </span>
                    <span className="font-semibold text-slate-700">Amazon Prime</span>
                  </div>
                  <span className="font-bold text-slate-900">3,200,000 VND</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 bg-slate-200 rounded-md flex items-center justify-center font-bold">
                      S
                    </span>
                    <span className="font-semibold text-slate-700">Starbucks Coffee</span>
                  </div>
                  <span className="font-bold text-slate-900">1,450,000 VND</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountOverviewPage;
