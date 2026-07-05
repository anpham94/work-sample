import React from "react";
import { formatNumber } from "@/utils/format";
import { formatDateDisplay } from "@/utils/helper";
import { type TransactionDetailProps } from "@/types/prop";

const TransactionDetail: React.FC<TransactionDetailProps> = ({ selectedTx }) => {
  if (!selectedTx) {
    return (
      <section className="bg-slate-50/50 rounded-2xl border border-dashed border-slate-300 shadow-xs p-6 text-center sticky top-20 flex flex-col items-center justify-center min-h-[530px] h-full transition-all">
        <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center border border-slate-200/60 text-indigo-500 shadow-2xs mb-4 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0-4.5 4.5M21 7.5H7.5"
            />
          </svg>
        </div>
        <div className="space-y-1.5 max-w-[240px]">
          <h3 className="text-sm font-bold text-slate-700">Chi tiết giao dịch</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Vui lòng chọn một giao dịch từ danh sách bên cạnh để xem chi tiết giao dịch.
          </p>
        </div>
      </section>
    );
  }

  const isCredit = selectedTx.amount > 0;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sticky top-20 min-h-[530px] h-full flex flex-col justify-between transition-all">
      <div className="space-y-4 flex-1 flex flex-col justify-start">
        <h3 className="text-base font-bold text-slate-900">Chi tiết giao dịch</h3>

        <div className="text-center py-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Số tiền giao dịch
          </span>
          <h2
            className={`text-xl font-black tracking-tight ${isCredit ? "text-emerald-600" : "text-slate-900"}`}
          >
            {isCredit ? "+" : ""}
            {formatNumber(selectedTx.amount)} VND
          </h2>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3.5 font-sans text-xs flex-1">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Trạng thái</span>
            <span className="text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
              {selectedTx.status || "Thành công"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">Mã giao dịch</span>
            <span className="font-mono text-slate-800 font-bold bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[11px] select-all cursor-pointer hover:bg-slate-100 transition-colors">
              {selectedTx.id}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">Thời gian</span>
            <span className="text-slate-800 font-semibold">
              {formatDateDisplay(selectedTx.date)}
            </span>
          </div>

          <hr className="border-dashed border-slate-200 my-1" />

          <div className="flex justify-between items-start gap-4">
            <span className="text-slate-400 shrink-0">Danh mục chi tiêu</span>
            <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 uppercase tracking-wider max-w-[150px] truncate">
              {selectedTx.category}
            </span>
          </div>

          <div className="flex justify-between items-start gap-4">
            <span className="text-slate-400 shrink-0">Nội dung thanh toán</span>
            <span className="text-slate-800 font-semibold text-right break-words max-w-[180px] leading-relaxed">
              {selectedTx.description}
            </span>
          </div>

          <hr className="border-dashed border-slate-200 my-1" />

          <div className="flex justify-between items-baseline pt-1">
            <span className="text-slate-400 text-sm">Tổng số tiền</span>
            <span
              className={`text-lg font-black tracking-tight ${isCredit ? "text-emerald-600" : "text-slate-900"}`}
            >
              {isCredit ? "+" : ""}
              {formatNumber(selectedTx.amount)} VND
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium font-sans">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-3.5 h-3.5 text-emerald-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
        Chi tiết giao dịch điện tử được bảo mật mã hóa
      </div>
    </section>
  );
};

export default TransactionDetail;
