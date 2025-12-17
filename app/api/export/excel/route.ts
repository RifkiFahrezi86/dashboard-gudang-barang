import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  const { rows } = await sql`
    SELECT id, nama, jenis, stok, satuan
    FROM barang
    ORDER BY stok ASC
  `;

  let csv = "ID,Nama,Jenis,Stok,Satuan\n";
  rows.forEach((r) => {
    csv += `${r.id},${r.nama},${r.jenis},${r.stok},${r.satuan}\n`;
  });

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=laporan-stok.csv",
    },
  });
}
