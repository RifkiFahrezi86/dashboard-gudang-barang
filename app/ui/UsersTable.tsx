import { User } from "@/app/lib/types";

export default function UsersTable({ data }: { data: User[] }) {
  return (
    <section className="card">
      <h3>Manajemen User</h3>
      <table>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge ${user.role}`}>
                  {user.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
