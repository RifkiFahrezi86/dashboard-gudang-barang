export type StockStatus = "safe" | "warning" | "danger" | "critical";

export function getStockStatus(
  stok: number,
  limit: number
): StockStatus {
  if (stok <= limit * 0.3) {
    return "critical"; // 🟣 sangat kritis
  }

  if (stok <= limit * 0.6) {
    return "danger"; // 🔴 rendah
  }

  if (stok <= limit) {
    return "warning"; // 🟡 menipis
  }

  return "safe"; // 🟢 aman
}
export function getStockLabel(status: StockStatus) {
  switch (status) {
    case "critical":
      return "Sangat Kritis";
    case "danger":
      return "Stok Menipis";
    case "warning":
      return "Perlu Perhatian";
    default:
      return "Aman";
  }
}
export const DEFAULT_STOCK_LIMIT = 10;