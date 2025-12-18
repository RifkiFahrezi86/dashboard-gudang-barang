"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
/* CREATE */
export async function createBarang(formData: FormData) {
  const id = formData.get("id") as string;
  const nama = formData.get("nama") as string;
  const jenis = formData.get("jenis") as string;
  const satuan = formData.get("satuan") as string;

  const stokRaw = formData.get("stok");
  const stok = Number(stokRaw);

  if (!id || !nama || !jenis || !satuan || isNaN(stok)) {
    throw new Error("Data tidak valid");
  }

  await sql`
    INSERT INTO barang (id, nama, jenis, stok, satuan)
    VALUES (${id}, ${nama}, ${jenis}, ${stok}, ${satuan})
  `;

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/barang");
  redirect("/dashboard/barang");


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
  redirect("/dashboard/barang");
}


/* DELETE */
export async function deleteBarang(id: string) {
  await sql`
    DELETE FROM barang
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/barang");
  redirect("/dashboard/barang");
}

/* USER MANAGEMENT */

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;

  if (!name || !email || !role) {
    throw new Error("Data tidak lengkap");
  }

  await sql`
    INSERT INTO users (name, email, role)
    VALUES (${name}, ${email}, ${role})
  `;

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}