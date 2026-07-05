import React, { useState, useMemo } from "react";
import { type AccountTransaction } from "@/types/account";
import { formatNumber } from "@/utils/format";
import CustomSelect from "@/components/CustomSelect";
import { formatDateDisplay } from "@/utils/helper";
import { type TransactionHistoryProps } from "@/types/prop";

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  selectedTxId,
  onSelectTx,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "in" | "out">("all");

  const filterOptions = [
    { value: "all", label: "Tất cả giao dịch" },
    { value: "in", label: "Tiền vào (Credit)" },
    { value: "out", label: "Tiền ra (Debit)" },
  ];

  const filteredAndSortedTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter((tx) => {
        const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType =
          filterType === "all" ||
          (filterType === "in" && tx.amount > 0) ||
          (filterType === "out" && tx.amount < 0);

        return matchesSearch && matchesType;
      });
  }, [transactions, searchTerm, filterType]);

  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: AccountTransaction[] } = {};
    filteredAndSortedTransactions.forEach((tx) => {
      if (!tx.date) return;
      const [year, month] = tx.date.split("-");
      const groupKey = `Tháng ${month} / ${year}`;
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(tx);
    });
    return groups;
  }, [filteredAndSortedTransactions]);

  return (
    <section className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
        <div className="sm:col-span-2 space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block h-[16px] leading-[16px]">
            Tìm kiếm giao dịch
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nhập nội dung giao dịch để tìm kiếm..."
            className="w-full text-sm border border-slate-200 rounded-xl px-3 py-[11px] bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 shadow-2xs transition-all"
          />
        </div>

        <div className="w-full">
          <CustomSelect
            label="Loại giao dịch"
            options={filterOptions}
            defaultValue={filterType}
            onChange={(value) => setFilterType(value as "all" | "in" | "out")}
          />
        </div>
      </div>

      <div className="p-4 space-y-4 max-h-[450px] overflow-y-auto">
        {filteredAndSortedTransactions.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">
            Không tìm thấy lịch sử giao dịch phù hợp.
          </p>
        ) : (
          Object.entries(groupedTransactions).map(([monthLabel, txs]) => (
            <div key={monthLabel} className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                {monthLabel}
              </span>

              {txs.map((tx) => {
                const isSelected = tx.id === selectedTxId;
                return (
                  <div
                    key={tx.id}
                    onClick={() => onSelectTx(tx)}
                    className={`flex justify-between items-center p-3.5 rounded-xl transition-all border cursor-pointer group ${
                      isSelected
                        ? "bg-indigo-50/70 border-indigo-200 shadow-xs"
                        : "bg-white border-slate-100 hover:bg-indigo-50/30 hover:border-indigo-100"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1 mr-3">
                      <div
                        className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          tx.amount > 0
                            ? "bg-emerald-50 text-emerald-600"
                            : isSelected
                              ? "bg-white text-slate-600 border border-slate-200"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {tx.amount > 0 ? "IN" : "OUT"}
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-semibold truncate transition-colors ${
                            isSelected
                              ? "text-indigo-700"
                              : "text-slate-800 group-hover:text-indigo-600"
                          }`}
                        >
                          {tx.description}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                          <span>{formatDateDisplay(tx.date)}</span>
                          <span>•</span>
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-600">
                            {tx.category}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p
                        className={`text-sm font-bold tracking-tight ${
                          tx.amount > 0
                            ? "text-emerald-600"
                            : isSelected
                              ? "text-slate-900"
                              : "text-slate-800"
                        }`}
                      >
                        {tx.amount > 0 ? "+" : ""}
                        {formatNumber(tx.amount)} VND
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Số dư sau TX: {tx.balanceAfter.toLocaleString("vi-VN")} VND
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TransactionHistory;
