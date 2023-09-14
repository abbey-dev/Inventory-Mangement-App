export function getYearFromDate(date: Date) {
  const _dt = new Date(date);
  const year = _dt.getFullYear();
  const month = ("0" + (_dt.getMonth() + 1)).slice(-2);
  const day = ("0" + _dt.getDate()).slice(-2);
  return `${year}/${month}/${day}`;
}

export function normaliseNumberFields(value: number) {
  return value <= 0 ? "" : value;
}

export function is2xxSuccessfull(statusCode?: number): boolean {
  if (!statusCode) return false;
  return statusCode.toString().startsWith("2");
}
