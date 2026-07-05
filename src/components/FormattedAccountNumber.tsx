import React from "react";
import { formatAccountNumber } from "@/utils/format";
import { type FormattedAccountNumberProps } from "@/types/prop";

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
