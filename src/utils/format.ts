export const formatNumber = (value: number): string => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  if (value % 1 !== 0) {
    return `${isNegative ? "-" : ""}${absValue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 20 })}`;
  }

  return `${isNegative ? "-" : ""}${absValue.toLocaleString("en-US")}`;
};

export const formatAccountNumber = (accountNumber: number): string => {
  const numStr = accountNumber.toString();
  return numStr.replace(/(\d{4})(?=\d)/g, "$1 ");
};
