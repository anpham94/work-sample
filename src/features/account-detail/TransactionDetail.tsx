import React from "react";

const TransactionDetail: React.FC = () => {
  return (
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
  );
};

export default TransactionDetail;
