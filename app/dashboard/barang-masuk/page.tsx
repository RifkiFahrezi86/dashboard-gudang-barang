import Header from "@/app/ui/Header";
import Pagination from "@/app/ui/Pagination";
import { getBarangMasuk } from "@/app/lib/db";
import TransaksiTable from "@/app/ui/TransaksiTable";


export default async function BarangMasukPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);

  const { data, total, pageSize } = await getBarangMasuk({ page });

  return (
    <>
                <Header/>
                <TransaksiTable data={data} />

            <Pagination
            page={page}
            total={total}
            pageSize={pageSize}
            search=""
            basePath="/dashboard/barang-masuk"
            />
    </>
  );
}
