"use client";

import { loginUser } from "@/app/lib/actions";

export default function LoginForm() {
  return (
    <div className="login-card">
      <div className="login-header">
        <h1>Gudang Barang</h1>
        <p>Silakan login untuk melanjutkan</p>
      </div>

      <form action={loginUser} className="login-form">
        <label>
          Email
          <input
            type="email"
            name="email"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            required
          />
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
