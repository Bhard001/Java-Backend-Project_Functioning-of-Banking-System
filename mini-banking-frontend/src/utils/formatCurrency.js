// utils/formatCurrency.js

/**
 * Format a number into INR currency.
 * Example: 1000 → ₹1,000.00
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};
