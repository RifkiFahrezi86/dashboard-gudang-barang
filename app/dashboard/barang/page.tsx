import Header from "@/app/ui/Header";
import BarangTable from "@/app/ui/BarangTable";
import Pagination from "@/app/ui/Pagination";
import Search from "@/app/ui/Search";
import { getBarang } from "@/app/lib/db";
import { redirect } from "next/navigation";
import { getRole } from "@/app/lib/auth";

type PageProps = {
  searchParams?: {
    page?: string;
    search?: string;
  };
};

export default async function BarangPage({ searchParams }: PageProps) {
  const role = await getRole(); // ✅ FIX

  const page = Number(searchParams?.page ?? 1);
  const search = searchParams?.search ?? "";

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
      <Header />

      <div className="page-actions">
        <div className="search-group">
          <Search defaultValue={search} />
        </div>

        {/* ADMIN ONLY */}
        {role === "admin" && (
          <a href="/dashboard/barang/create" className="btn-primary">
            + Tambah Barang
          </a>
        )}
      </div>

      <BarangTable data={barang} role={role} />

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
