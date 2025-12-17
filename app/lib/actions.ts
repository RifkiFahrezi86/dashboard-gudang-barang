"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

/* CREATE */
export async function createBarang(formData: FormData) {
  await sql`
    INSERT INTO barang (id, nama, jenis, stok, satuan)
    VALUES (
      ${formData.get("id")},
      ${formData.get("nama")},
      ${formData.get("jenis")},
      ${Number(formData.get("stok"))},
      ${formData.get("satuan")}
    )
  `;

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/barang");
}

/* UPDATE */
export async function updateBarang(formData: FormData) {
  const id = formData.get("id") as string;

  await sql`
    UPDATE barang
    SET
      nama = ${formData.get("nama")},
      jenis = ${formData.get("jenis")},
      stok = ${Number(formData.get("stok"))},
      satuan = ${formData.get("satuan")}
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
