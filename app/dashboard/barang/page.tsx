import Header from "@/app/ui/Header";
import BarangTable from "@/app/ui/BarangTable";
import Pagination from "@/app/ui/Pagination";
import Search from "@/app/ui/Search";
import { getBarang } from "@/app/lib/db";
import { redirect } from "next/navigation";

export default async function BarangPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams.page ?? 1);
  const search = resolvedSearchParams.search ?? "";

  const { barang, total, pageSize } = await getBarang({
    page,
    search,
  });
  const totalPages = Math.ceil(total / pageSize);
  if (page > totalPages && totalPages > 0) {
    redirect(`/dashboard/barang?page=${totalPages}`);
  }
  return (
    <>
      <Header/>

          <div className="page-actions">
            <div className="search-group">
              <Search defaultValue={search} />
            </div>

            <a href="/dashboard/barang/create" className="btn-primary">
              + Tambah Barang
            </a>
            </div>


      <BarangTable data={barang} />

      <Pagination
        page={page}
        total={total}
        pageSize={pageSize}
        search={search}
        basePath="/dashboard/barang"
      />            
          </> 
  );
}