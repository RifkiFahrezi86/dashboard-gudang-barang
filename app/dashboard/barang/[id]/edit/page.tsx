import Header from "@/app/ui/Header";
import Form from "@/app/ui/Form";
import { getBarangById } from "@/app/lib/db";
import { updateBarang } from "@/app/lib/actions";
import { notFound } from "next/navigation";

export default async function EditBarangPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 🔥 WAJIB unwrap params
  const { id } = await params;

  const barang = await getBarangById(id);

  if (!barang) {
    notFound();
  }

  return (
    <>
      <Header title="Edit Barang" />
      <Form
        action={updateBarang}
        defaultValues={barang}
        submitText="Simpan Perubahan"
      />
    </>
  );
}
