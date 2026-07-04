import React from "react";
import { formatAccountNumber } from "@/utils/format";

interface FormattedAccountNumberProps {
  value: number;
  className?: string;
}

const FormattedAccountNumber: React.FC<FormattedAccountNumberProps> = ({
  value,
  className = "",
}) => {
  return (
    <p className={`font-mono font-semibold tracking-tight ${className}`}>
      {formatAccountNumber(value)}
    </p>
  );
};

export default FormattedAccountNumber;
