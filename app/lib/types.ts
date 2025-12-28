export type Barang = {
  id: string;
  nama: string;
  jenis: string;
  stok: number;
  satuan: string;
};


export type Transaksi = {
  id: number;
  nama: string;
  jenis: string;
  jumlah: number;
  tanggal: string;
  sumber?: string;
  tujuan?: string;
  catatan?: string;
  status?: "pending" | "approved" | "rejected";
};


export type User = {
  id: string;        // UUID
  name: string;
  email: string;
  role: "admin" | "staff";
  created_at: string;
};
