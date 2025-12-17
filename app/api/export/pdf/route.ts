import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  const { rows } = await sql`
    SELECT id, nama, jenis, stok, satuan
    FROM barang
  `;

  let html = `
    <h1>Laporan Stok</h1>
    <table border="1" cellspacing="0" cellpadding="6">
      <tr>
        <th>ID</th><th>Nama</th><th>Jenis</th><th>Stok</th><th>Satuan</th>
      </tr>
  `;

  rows.forEach((r) => {
    html += `
      <tr>
        <td>${r.id}</td>
        <td>${r.nama}</td>
        <td>${r.jenis}</td>
        <td>${r.stok}</td>
        <td>${r.satuan}</td>
      </tr>
    `;
  });

  html += "</table>";

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
