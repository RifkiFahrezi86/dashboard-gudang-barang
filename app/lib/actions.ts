"use server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";




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


/* USER MANAGEMENT WITH PASSWORD */

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email dan password wajib diisi");
  }

  const { rows } = await sql`
    SELECT id, name, role, password
    FROM users
    WHERE email = ${email}
  `;

  const user = rows[0];
  if (!user) throw new Error("User tidak ditemukan");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Password salah");

const cookieStore = await cookies();

cookieStore.set("role", user.role, {
  httpOnly: true,
  path: "/",
});

  redirect("/dashboard");
}


export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as "admin" | "staff";
  const password = formData.get("password") as string; 

  if (!name || !email || !role || !password) {
    throw new Error("Data tidak lengkap");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO users (name, email, role, password)
    VALUES (${name}, ${email}, ${role}, ${hashedPassword})
  `;

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function logoutUser() {
  const cookieStore = await cookies();

  cookieStore.delete("role");

  redirect("/login");
}