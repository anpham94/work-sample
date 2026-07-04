import React from "react";
import CustomModal from "@/components/CustomModal";
import useToggle from "@/hooks/useToggle";
import AccountGrid from "@/features/dashboard/AccountGrid";
import TransferSection from "@/features/dashboard/TransferSection";
import SpendingAnalysis from "@/features/dashboard/SpendingAnalysis";

const AccountOverviewPage: React.FC = () => {
  const [isModalOpen, toggleModal] = useToggle(false);

  const accountOptions = [
    { value: "acc-01", label: "Tài khoản giao dịch (*5612) - 5,230,000 VND" },
    { value: "acc-02", label: "Tài khoản giao dịch (*4322) - 12,500,000 VND" },
    { value: "acc-03", label: "Tài khoản gửi tiết kiệm (*1099) - 245,000,000 VND" },
  ];

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

  const handleConfirmTransfer = () => {
    alert("Giao dịch đã thực hiện mô phỏng thành công!");
    toggleModal();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <AccountGrid accounts={mockAccounts} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <TransferSection accountOptions={accountOptions} onTransferClick={toggleModal} />

        <SpendingAnalysis />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        title="Xác nhận giao dịch chuyển khoản"
        cancelText="Hủy bỏ lệnh"
        confirmText="Xác nhận gửi tiền"
        onConfirm={handleConfirmTransfer}
      >
        <div className="p-3 bg-indigo-50/50 text-indigo-900 rounded-xl border border-indigo-100 flex gap-2.5 items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 11.518 1.173l-.041.02A.75.75 0 0111.25 11.25zM12 4.5c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5S4.5 16.142 4.5 12 7.858 4.5 12 4.5z"
            />
          </svg>
          <p className="text-xs text-indigo-950 font-medium leading-relaxed">
            Hệ thống đang chạy ở môi trường demo sandbox. Bạn có chắc chắn muốn thực hiện lệnh
            chuyển khoản nội bộ này không?
          </p>
        </div>
      </CustomModal>
    </div>
  );
};

export default AccountOverviewPage;
