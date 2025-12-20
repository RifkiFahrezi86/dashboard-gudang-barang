import Header from "@/app/ui/Header";
import LaporanActions from "@/app/ui/LaporanActions";
import LaporanTable from "@/app/ui/LaporanTable";
import { getAllBarang } from "@/app/lib/db";

export default async function LaporanStokPage() {
  const data = await getAllBarang();

  return (
    <>
      <Header />
      <LaporanActions />
      <LaporanTable data={data} />
    </>
  );
}
