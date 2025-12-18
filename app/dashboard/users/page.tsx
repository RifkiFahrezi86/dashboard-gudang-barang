import UsersTable from "@/app/ui/UsersTable";
import { sql } from "@vercel/postgres";
import { User } from "@/app/lib/types";

export default async function UsersPage() {
  const { rows } = await sql<User>`
    SELECT id, name, email, role
    FROM users
    ORDER BY created_at DESC
  `;

  return <UsersTable data={rows} />;
}
