import Header from "@/app/ui/Header";
import { getBarangById } from "@/app/lib/db";
import { deleteBarang } from "@/app/lib/actions";
import { redirect } from "next/navigation";

export default async function DeleteBarangPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ⬅️ WAJIB
  const barang = await getBarangById(id);

  if (!barang) {
    return <div>Barang tidak ditemukan</div>;
  }

  async function action() {
    "use server";
    await deleteBarang(id);
    redirect("/dashboard/barang");
  }

  return (
    <>
      <Header title="Hapus Barang" />
      <div className="delete-box">
        <p>Apakah kamu yakin ingin menghapus barang:</p>
        <h3>{barang.nama}</h3>

        <form action={action}>
          <button className="btn-danger">Ya, Hapus</button>
        </form>

        <a href="/dashboard/barang" className="btn-secondary">
          Batal
        </a>
      </div>
    </>
  );
}
