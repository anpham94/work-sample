import React, { useEffect, useState } from "react";
import CustomModal from "@/components/CustomModal";
import AccountGrid from "@/features/dashboard/AccountGrid";
import TransferSection from "@/features/dashboard/TransferSection";
import SpendingAnalysis from "@/features/dashboard/SpendingAnalysis";
import useAccountStore from "@/stores/accountStore";
import { type TransferFormData } from "@/types/prop";

type TransferStep = "idle" | "confirm" | "otp" | "success";

const AccountOverviewPage: React.FC = () => {
  const {
    accounts,
    error: storeError,
    loading: isStoreLoading,
    fetchAccounts,
    executeTransfer,
  } = useAccountStore();

  const [transferStep, setTransferStep] = useState<TransferStep>("idle");
  const [transferData, setTransferData] = useState<TransferFormData | null>(null);

  const [otpValue, setOtpValue] = useState<string>("");
  const [otpError, setOtpError] = useState<string | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const accountOptions = accounts.map((acc) => ({
    value: acc.id,
    label: `${acc.type} (*${String(acc.number).slice(-4)}) - ${acc.balance.toLocaleString("vi-VN")} VND`,
    type: acc.type,
    number: acc.number,
  }));

  const handleTransferSubmit = (data: TransferFormData) => {
    setTransferData(data);
    setTransferStep("confirm");
  };

  const handleConfirmInfo = () => {
    setOtpValue("");
    setOtpError(null);
    setTransferStep("otp");
  };

  const handleVerifyOtp = async () => {
    if (otpValue !== "123456") {
      setOtpError("Mã xác thực OTP không chính xác. Vui lòng thử lại với mã '123456'.");
      return;
    }

    if (!transferData) return;

    const sourceAcc = accounts.find((a) => a.id === transferData.fromAccount);
    const targetAcc = accounts.find((a) => a.id === transferData.toAccount);

    if (!sourceAcc || !targetAcc) {
      setOtpError("Lỗi dữ liệu: Không tìm thấy thông tin hệ thống của tài khoản.");
      return;
    }

    if (sourceAcc.balance < transferData.amount) {
      setOtpError("Số dư tài khoản nguồn không đủ để thực hiện lệnh chuyển khoản.");
      return;
    }

    const newSourceBalance = sourceAcc.balance - transferData.amount;
    const newTargetBalance = targetAcc.balance + transferData.amount;

    setOtpError(null);

    const isSuccess = await executeTransfer({
      fromAccountId: transferData.fromAccount,
      newSourceBalance,
      toAccountId: transferData.toAccount,
      newTargetBalance,
      amount: transferData.amount,
      description: transferData.description,
    });

    if (isSuccess) {
      setTransferStep("success");
    } else {
      setOtpError(storeError || "Giao dịch không thành công do lỗi kết nối hệ thống.");
    }
  };

  const handleCloseFlow = () => {
    setTransferStep("idle");
    setTransferData(null);
  };

  const getAccountLabel = (id?: string) => {
    return accountOptions.find((opt) => opt.value === id)?.label || id;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <AccountGrid accounts={accounts} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <TransferSection accountOptions={accountOptions} onTransferSubmit={handleTransferSubmit} />
        <SpendingAnalysis />
      </div>

      {/* ================= MODAL 1: XÁC NHẬN THÔNG TIN GIAO DỊCH ================= */}
      <CustomModal
        isOpen={transferStep === "confirm"}
        onClose={handleCloseFlow}
        title="Xác nhận giao dịch chuyển khoản"
        cancelText="Hủy bỏ lệnh"
        confirmText="Xác nhận & Nhận mã OTP"
        onConfirm={handleConfirmInfo}
      >
        <div className="space-y-3 font-sans text-xs">
          <div className="p-3 bg-indigo-50/50 text-indigo-950 rounded-xl border border-indigo-100 flex gap-2 items-start mb-1">
            <p className="leading-relaxed">
              Vui lòng rà soát kỹ lưỡng các thông tin tài khoản đích và số tiền giao dịch dưới đây
              trước khi nhận mã xác thực OTP.
            </p>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-400">Tài khoản nguồn</span>
            <span className="text-slate-800 font-semibold">
              {getAccountLabel(transferData?.fromAccount)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-400">Tài khoản đích</span>
            <span className="text-slate-800 font-semibold">
              {getAccountLabel(transferData?.toAccount)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-400">Nội dung</span>
            <span className="text-slate-800 font-medium">{transferData?.description}</span>
          </div>
          <div className="flex justify-between items-baseline pt-1">
            <span className="text-slate-400 text-sm">Số tiền cần chuyển</span>
            <span className="text-lg font-black text-indigo-600 tracking-tight">
              {transferData?.amount.toLocaleString("vi-VN")} VND
            </span>
          </div>
        </div>
      </CustomModal>

      {/* ================= MODAL 2: XÁC THỰC MÃ OTP BẢO MẬT ================= */}
      <CustomModal
        isOpen={transferStep === "otp"}
        onClose={handleCloseFlow}
        title="Xác thực giao dịch (OTP)"
        cancelText="Quay lại"
        confirmText={isStoreLoading ? "Đang xử lý..." : "Xác thực giao dịch"}
        onConfirm={handleVerifyOtp}
      >
        <div className="space-y-4 font-sans text-xs">
          <p className="text-slate-500 leading-relaxed text-center">
            Mã OTP bảo mật đã được gửi giả lập. Vui lòng nhập mã{" "}
            <strong className="text-slate-800 font-bold bg-slate-100 px-1.5 py-0.5 rounded">
              123456
            </strong>{" "}
            để tiếp tục xác minh lệnh.
          </p>
          <div className="space-y-1.5">
            <input
              type="text"
              maxLength={6}
              disabled={isStoreLoading}
              placeholder="Nhập 6 số mã OTP"
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
              className="w-full border border-slate-200 rounded-xl p-3 text-center font-mono text-base font-bold tracking-[0.5em] focus:outline-indigo-500 text-slate-900 disabled:bg-slate-50"
            />
          </div>
          {otpError && (
            <p className="text-xs font-semibold text-rose-500 bg-rose-50 p-2 rounded-lg border border-rose-100 text-center">
              {otpError}
            </p>
          )}
        </div>
      </CustomModal>

      {/* ================= MODAL 3: BÁO CÁO GIAO DỊCH THÀNH CÔNG ================= */}
      <CustomModal
        isOpen={transferStep === "success"}
        onClose={handleCloseFlow}
        title="Giao dịch thành công"
        confirmText="Hoàn tất & Đóng"
        onConfirm={handleCloseFlow}
      >
        <div className="flex flex-col items-center justify-center py-4 space-y-3.5 text-center font-sans">
          <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-2xs animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">Chuyển tiền nội bộ hoàn tất</h4>
            <p className="text-xs text-slate-400 max-w-[260px] mx-auto leading-relaxed">
              Hệ thống đã ghi nhận biến động số dư thành công. Biên lai điện tử đã được mã hóa lưu
              trữ.
            </p>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default AccountOverviewPage;
