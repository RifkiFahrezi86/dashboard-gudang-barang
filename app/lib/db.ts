// app/lib/db.ts
import { sql } from "@vercel/postgres";
import { Transaksi, Barang } from "./types";

export async function getDashboardStats() {
  const barang = await sql`SELECT COUNT(*) FROM barang`;
  const masuk = await sql`SELECT COALESCE(SUM(jumlah),0) FROM barang_masuk`;
  const keluar = await sql`SELECT COALESCE(SUM(jumlah),0) FROM barang_keluar`;
  const jenis = await sql`SELECT COUNT(DISTINCT jenis) FROM barang`;
  const satuan = await sql`SELECT COUNT(DISTINCT satuan) FROM barang`;

  return {
    barang: Number(barang.rows[0].count),
    masuk: Number(masuk.rows[0].coalesce),
    keluar: Number(keluar.rows[0].coalesce),
    jenis: Number(jenis.rows[0].count),
    satuan: Number(satuan.rows[0].count),
  };
}

export async function getLowStock(): Promise<Barang[]> {
  const { rows } = await sql<Barang>`
    SELECT id, nama, jenis, stok, satuan
    FROM barang
    WHERE stok <= 100
    ORDER BY stok ASC
  `;
  return rows;
}

export async function getChartData() {
  const { rows } = await sql`
    SELECT nama, stok
    FROM barang
    ORDER BY nama ASC
  `;

  return rows.map((item) => ({
    label: item.nama,
    value: Number(item.stok),
  }));
}
export async function getBarangById(id: string) {
  const { rows } = await sql`
    SELECT id, nama, jenis, stok, satuan
    FROM barang
    WHERE id = ${id}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function getAllBarang() {
  const { rows } = await sql`
    SELECT *
    FROM barang
    ORDER BY nama ASC
  `;
  return rows;
}
type GetBarangParams = {
  page: number;
  search: string;
};

export async function getBarang({
  page,
  search,
}: {
  page: number;
  search: string;
}): Promise<{
  barang: Barang[];
  total: number;
  pageSize: number;
}> {
  const pageSize = 7;
  const offset = (page - 1) * pageSize;

  const barang = search
    ? (
        await sql`
          SELECT id, nama, jenis, stok, satuan
          FROM barang
          WHERE nama ILIKE ${"%" + search + "%"}
          ORDER BY nama ASC
          LIMIT ${pageSize}
          OFFSET ${offset}
        `
      ).rows
    : (
        await sql`
          SELECT id, nama, jenis, stok, satuan
          FROM barang
          ORDER BY nama ASC
          LIMIT ${pageSize}
          OFFSET ${offset}
        `
      ).rows;

  const total = search
    ? (
        await sql`
          SELECT COUNT(*)::int AS total
          FROM barang
          WHERE nama ILIKE ${"%" + search + "%"}
        `
      ).rows[0].total
    : (
        await sql`
          SELECT COUNT(*)::int AS total
          FROM barang
        `
      ).rows[0].total;

  return {
    barang: barang as Barang[],
    total,
    pageSize,
  };
}



export async function getLaporanStok(): Promise<Barang[]> {
  const { rows } = await sql`
    SELECT id, nama, jenis, stok, satuan
    FROM barang
    ORDER BY stok ASC
  `;

  return rows as Barang[];
}

export async function getBarangMasuk({ page }: { page: number }) {
  const pageSize = 7;
  const offset = (page - 1) * pageSize;

  const { rows } = await sql<Transaksi>`
    SELECT
      bm.id,
      b.nama,
      bm.jumlah,
      bm.tanggal
    FROM barang_masuk bm
    JOIN barang b ON b.id = bm.barang_id
    ORDER BY bm.tanggal DESC
    LIMIT ${pageSize}
    OFFSET ${offset}
  `;

  const totalResult = await sql`
    SELECT COUNT(*)::int AS total
    FROM barang_masuk
  `;

  return {
    data: rows,
    total: totalResult.rows[0].total,
    pageSize,
  };
}

export async function getBarangKeluar({ page }: { page: number }) {
  const pageSize = 7;
  const offset = (page - 1) * pageSize;

  const { rows } = await sql<Transaksi>`
    SELECT
      bk.id,
      b.nama,
      bk.jumlah,
      bk.tanggal
    FROM barang_keluar bk
    JOIN barang b ON b.id = bk.barang_id
    ORDER BY bk.tanggal DESC
    LIMIT ${pageSize}
    OFFSET ${offset}
  `;

  const totalResult = await sql`
    SELECT COUNT(*)::int AS total
    FROM barang_keluar
  `;

  return {
    data: rows,
    total: totalResult.rows[0].total,
    pageSize,
  };
}
