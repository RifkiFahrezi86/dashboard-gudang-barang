import { createUser } from "@/app/lib/actions";

export default function CreateUserPage() {
  return (
    <section className="card">
      <h3>Tambah User</h3>

      <form action={createUser} className="form">
        <input name="name" placeholder="Nama" required />
        <input name="email" type="email" placeholder="Email" required />

        <select name="role" required>
          <option value="">Pilih Role</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit">Simpan</button>
      </form>
    </section>
  );
}
