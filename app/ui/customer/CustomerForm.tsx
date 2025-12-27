
"use client";

import { useState } from "react";
import "./customer.css";

export default function CustomerForm() {
  const [form, setForm] = useState({
    nama: "",
    jenis: "keluar",
    barang: "",
    jumlah: "",
    catatan: "",
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    console.log("DATA CUSTOMER:", form);
    alert("Permintaan berhasil dikirim (simulasi)");

    setForm({
      nama: "",
      jenis: "keluar",
      barang: "",
      jumlah: "",
      catatan: "",
    });
  }

  return (
    <form className="card form-grid" onSubmit={handleSubmit}>
      <input
        name="nama"
        placeholder="Nama Customer"
        value={form.nama}
        onChange={handleChange}
        required
      />

      <select name="jenis" value={form.jenis} onChange={handleChange}>
        <option value="masuk">Barang Masuk</option>
        <option value="keluar">Barang Keluar</option>
      </select>

      <input
        name="barang"
        placeholder="Nama Barang"
        value={form.barang}
        onChange={handleChange}
        required
      />

      <input
        name="jumlah"
        type="number"
        placeholder="Jumlah"
        value={form.jumlah}
        onChange={handleChange}
        required
      />

      <textarea
        name="catatan"
        placeholder="Catatan tambahan"
        value={form.catatan}
        onChange={handleChange}
      />

      <button className="btn-primary">Kirim Permintaan</button>
    </form>
  );
}
