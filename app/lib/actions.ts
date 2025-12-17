"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

/* CREATE */
export async function createBarang(formData: FormData) {
  const id = formData.get("id") as string;
  const nama = formData.get("nama") as string;
  const jenis = formData.get("jenis") as string;
  const stok = Number(formData.get("stok"));
  const satuan = formData.get("satuan") as string;

  await sql`
    INSERT INTO barang (id, nama, jenis, stok, satuan)
    VALUES (${id}, ${nama}, ${jenis}, ${stok}, ${satuan})
  `;

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/barang");
}


/* UPDATE */
export async function updateBarang(formData: FormData) {
  const id = formData.get("id") as string;
  const nama = formData.get("nama") as string;
  const jenis = formData.get("jenis") as string;
  const stok = Number(formData.get("stok"));
  const satuan = formData.get("satuan") as string;

  await sql`
    UPDATE barang
    SET
      nama = ${nama},
      jenis = ${jenis},
      stok = ${stok},
      satuan = ${satuan}
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/barang");
}


/* DELETE */
export async function deleteBarang(id: string) {
  await sql`
    DELETE FROM barang
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/barang");
}
