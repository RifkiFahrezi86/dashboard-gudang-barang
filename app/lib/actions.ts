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
  revalidatePath("/dashboard/laporan"); 
  redirect("/dashboard/barang")
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
  revalidatePath("/dashboard/laporan"); 
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
  revalidatePath("/dashboard/laporan"); 
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
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
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


/* =============================================
   APPROVE & REJECT BARANG MASUK
============================================= */

export async function approveBarangMasuk(id: number) {

  // Get detail barang masuk
  const { rows } = await sql`
    SELECT barang_id, jumlah 
    FROM barang_masuk 
    WHERE id = ${id}
  `;

  if (!rows[0]) throw new Error("Transaksi tidak ditemukan");

  const { barang_id, jumlah } = rows[0];

  // Update status jadi approved
  await sql`
    UPDATE barang_masuk
    SET status = 'approved'
    WHERE id = ${id}
  `;

  // TAMBAH STOK BARANG
  await sql`
    UPDATE barang
    SET stok = stok + ${jumlah}
    WHERE id = ${barang_id}
  `;

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/barang");
  revalidatePath("/dashboard/barang-masuk");
  redirect("/dashboard/barang-masuk");
}

export async function rejectBarangMasuk(id: number) {

  await sql`
    UPDATE barang_masuk
    SET status = 'rejected'
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard/barang-masuk");
  redirect("/dashboard/barang-masuk");
}

/* =============================================
   APPROVE & REJECT BARANG KELUAR
============================================= */

export async function approveBarangKeluar(id: number) {

  // Get detail barang keluar
  const { rows } = await sql`
    SELECT barang_id, jumlah 
    FROM barang_keluar 
    WHERE id = ${id}
  `;

  if (!rows[0]) throw new Error("Transaksi tidak ditemukan");

  const { barang_id, jumlah } = rows[0];

  // Cek stok cukup atau tidak
  const stokResult = await sql`
    SELECT stok FROM barang WHERE id = ${barang_id}
  `;

  if (!stokResult.rows[0] || stokResult.rows[0].stok < jumlah) {
    throw new Error("Stok tidak mencukupi untuk approve pesanan ini");
  }

  // Update status jadi approved
  await sql`
    UPDATE barang_keluar
    SET status = 'approved'
    WHERE id = ${id}
  `;

  // KURANGI STOK BARANG
  await sql`
    UPDATE barang
    SET stok = stok - ${jumlah}
    WHERE id = ${barang_id}
  `;

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/barang");
  revalidatePath("/dashboard/barang-keluar");
  redirect("/dashboard/barang-keluar");
}

export async function rejectBarangKeluar(id: number) {

  await sql`
    UPDATE barang_keluar
    SET status = 'rejected'
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard/barang-keluar");
  redirect("/dashboard/barang-keluar");
}