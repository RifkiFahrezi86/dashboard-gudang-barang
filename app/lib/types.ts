// app/lib/types.ts - ADMIN DASHBOARD
export type Barang = {
  id: string;
  nama: string;
  jenis: string;
  stok: number;
  satuan: string;
};

// ✅ DIPERBAIKI - Tambah barang_id dan status required
export type Transaksi = {
  id: number;
  barang_id: string;        // ✅ WAJIB ADA untuk approve/reject
  nama: string;
  jenis: string;
  jumlah: number;
  tanggal: string;
  sumber?: string;           // Untuk barang_masuk
  tujuan?: string;           // Untuk barang_keluar
  catatan?: string;
  status: "pending" | "approved" | "rejected";  // ✅ REQUIRED
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff" | "customer";
  created_at: string;
};

// ✅ TAMBAHAN - Type khusus untuk pending approval
export type PendingTransaction = {
  id: number;
  barang_id: string;
  nama: string;
  jenis: string;
  jumlah: number;
  tanggal: string;
  sumber_atau_tujuan: string;
  catatan?: string;
  type: "masuk" | "keluar";
};
