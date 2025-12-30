import Header from "@/app/ui/Header";
import Pagination from "@/app/ui/Pagination";
import TransaksiTable from "@/app/ui/TransaksiTable";
import { getBarangKeluar } from "@/app/lib/db"; // ⬅️ WAJIB ADA

export default async function BarangKeluarPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;

  const page = Number(params.page || 1);

  const { data, total, pageSize } = await getBarangKeluar({
    page: isNaN(page) ? 1 : page,
  });

  return (
    <>
      <Header />
      
      <TransaksiTable data={data} />
      <Pagination
        page={page}
        total={total}
        pageSize={pageSize}
        search=""
        basePath="/dashboard/barang-keluar"
      />
    </>
  );
}
