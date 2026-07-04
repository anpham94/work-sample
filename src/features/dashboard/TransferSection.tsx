import React from "react";
import CustomSelect from "@/components/CustomSelect";

interface Option {
  value: string;
  label: string;
}

interface TransferSectionProps {
  accountOptions: Option[];
  onTransferClick: () => void;
}

const TransferSection: React.FC<TransferSectionProps> = ({ accountOptions, onTransferClick }) => {
  return (
    <section className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-900">Chuyển khoản</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Chuyển tiền nhanh giữa các tài khoản thanh toán của bạn
        </p>
      </div>

      <div className="space-y-3.5">
        <CustomSelect label="Tài khoản nguồn" options={accountOptions} defaultValue="acc-01" />
        <CustomSelect label="Tài khoản đích" options={accountOptions} defaultValue="acc-02" />

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

        <button
          type="button"
          onClick={onTransferClick}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3 rounded-xl text-sm transition-all shadow-xs cursor-pointer mt-2"
        >
          Thực hiện chuyển tiền
        </button>
      </div>
    </section>
  );
};

export default TransferSection;
