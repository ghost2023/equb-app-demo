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
