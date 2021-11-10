// format number as currency
/**
 * @function formatCurrency
 * Format number as currency (US Dollars)
 * 
 * @param {*} amount 
 * @returns {string} number formatted as currency
 * 
 * @example
 * formatCurrency(0)
 * // => $0.00 
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}