import React, { useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import { type OptionTransfer, type TransferSectionProps } from "@/types/prop";

const TransferSection: React.FC<TransferSectionProps> = ({ accountOptions, onTransferSubmit }) => {
  const filteredFromOptions = accountOptions.filter(
    (acc) =>
      acc.type.toLowerCase().includes("giao dịch") || acc.type.toLowerCase().includes("payment")
  );

  const [fromAccount, setFromAccount] = useState<string>(() => {
    return filteredFromOptions.length > 0 ? filteredFromOptions[0].value : "";
  });

  const filteredToOptions = accountOptions.filter((acc) => acc.value !== fromAccount);

  const [toAccount, setToAccount] = useState<string>(() => {
    return filteredToOptions.length > 0 ? filteredToOptions[0].value : "";
  });

  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("Chuyen tien noi bo");
  const [error, setError] = useState<string | null>(null);

  const formatOptions = (options: OptionTransfer[]) => {
    return options.map((opt) => ({
      value: opt.value,
      label: `${opt.type} - ${opt.number}`,
    }));
  };

  const handleSubmit = () => {
    setError(null);

    if (!fromAccount || !toAccount || !amount || !description.trim()) {
      setError("Vui lòng điền đầy đủ tất cả các trường thông tin.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Số tiền chuyển khoản phải lớn hơn 0 VND.");
      return;
    }

    if (fromAccount === toAccount) {
      setError("Tài khoản đích không được trùng với tài khoản nguồn.");
      return;
    }

    onTransferSubmit({
      fromAccount,
      toAccount,
      amount: parsedAmount,
      description: description.trim(),
    });
  };

  return (
    <section className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-900">Chuyển khoản</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Chuyển tiền nhanh giữa các tài khoản của bạn
        </p>
      </div>

      <div className="space-y-3.5">
        <CustomSelect
          label="Tài khoản nguồn"
          options={formatOptions(filteredFromOptions)}
          defaultValue={fromAccount}
          onChange={(val) => {
            setFromAccount(val);
            if (val === toAccount) {
              const nextValidDest = accountOptions.find((acc) => acc.value !== val);
              setToAccount(nextValidDest ? nextValidDest.value : "");
            }
          }}
        />

        <CustomSelect
          label="Tài khoản đích"
          options={formatOptions(filteredToOptions)}
          defaultValue={toAccount}
          onChange={(val) => setToAccount(val)}
        />

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Số tiền cần chuyển (VND)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Nhập số tiền"
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-indigo-500 text-slate-900"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Nội dung chuyển khoản
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Chuyen tien noi bo"
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-indigo-500 text-slate-900"
          />
        </div>

        {error && (
          <p className="text-xs font-semibold text-rose-500 bg-rose-50 p-2.5 rounded-lg border border-rose-100">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3 rounded-xl text-sm transition-all shadow-xs cursor-pointer mt-2"
        >
          Chuyển tiền
        </button>
      </div>
    </section>
  );
};

export default TransferSection;
