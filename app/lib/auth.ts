// app/lib/auth.ts
import { cookies } from "next/headers";

export type Role = "admin" | "staff";

export async function getRole(): Promise<Role> {
  const cookieStore = await cookies(); // ✅ WAJIB await
  const role = cookieStore.get("role")?.value;

  if (role === "admin" || role === "staff") {
    return role;
  }

  return "staff"; // default aman
}

export async function requireAdmin() {
  const role = await getRole(); // ✅ async-safe
  if (role !== "admin") {
    throw new Error("Forbidden: Admin only");
  }
}
