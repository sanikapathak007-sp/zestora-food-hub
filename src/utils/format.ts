/**
 * Indian Rupee (INR) currency and numeric formatters
 */

export function formatINR(amount: number): string {
  // Format with standard Indian grouping (lakhs/crores formatting if large, or clean integer)
  const isDecimalNeeded = amount % 1 !== 0;
  const formatted = Math.round(amount).toLocaleString('en-IN', {
    maximumFractionDigits: isDecimalNeeded ? 2 : 0,
    minimumFractionDigits: isDecimalNeeded ? 2 : 0
  });
  return `₹${formatted}`;
}

export function formatCompactINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}k`;
  }
  return `₹${amount}`;
}
