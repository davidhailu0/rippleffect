
export function getLastDayOfCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
  
    return new Date(year, month + 1, 0);
  }