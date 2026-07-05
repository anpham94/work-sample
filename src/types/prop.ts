import { type AccountTransaction, type AccountInfo } from "@/types/account";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
}

export interface Option {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  label: string;
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export interface FormattedAccountNumberProps {
  value: number;
  className?: string;
}

export interface HiddenBalanceProps {
  balance: number;
  className?: string;
  containerClassName?: string;
}

export interface AccountDetailHeaderProps {
  accountNumber: number;
  balance: number;
}

export interface TransactionDetailProps {
  selectedTx: AccountTransaction | null;
}

export interface TransactionHistoryProps {
  transactions: AccountTransaction[];
  selectedTxId: string | null;
  onSelectTx: (tx: AccountTransaction) => void;
}

export interface AccountGridProps {
  accounts: AccountInfo[];
}

export interface OptionTransfer {
  value: string;
  label: string;
  type: string;
  number: number;
}

export interface TransferFormData {
  fromAccount: string;
  toAccount: string;
  amount: number;
  description: string;
}

export interface TransferSectionProps {
  accountOptions: OptionTransfer[];
  onTransferSubmit: (data: TransferFormData) => void;
}
