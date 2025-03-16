export function debounce(func: Function, wait: number | undefined = 400) {
  let timeout: NodeJS.Timeout | number;

  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * parses a string into a number
 * @param str
 * @returns
 */
export function formatDays(days: number) {
  if (days < 7 || days % 7 !== 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  }
  if (days < 30) {
    return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""}`;
  }
  return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""}${days % 30 > 0 ? " and " + (days % 30) + " day" + (days % 30 > 1 ? "s" : "") : ""}`;
}
