// utils/formatDate.js

/**
 * Format a date string into readable format.
 * Example: "2025-08-23T12:30:00Z" → "Aug 23, 2025, 12:30 PM"
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return new Date(dateString).toLocaleString(undefined, options);
};
