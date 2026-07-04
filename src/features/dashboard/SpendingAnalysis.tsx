import React from "react";

const SpendingAnalysis: React.FC = () => {
  return (
    <section className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-900">Phân tích hành vi chi tiêu</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Dữ liệu phân tích dựa trên lịch sử hoạt động mới nhất
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
          <span className="text-xl font-extrabold text-slate-800 block mt-1">-14,205,000 VND</span>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpendingAnalysis;
