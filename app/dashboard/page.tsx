import Header from "@/app/ui/Header";
import StatCard from "@/app/ui/StatCard";
import StockTable from "@/app/ui/StockTable";
import { getDashboardStats, getLowStock } from "@/app/lib/db";


export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const stocks = await getLowStock();

  return (
    <>
      <Header/>

      <section className="cards">
        <StatCard title="Data Barang" value={stats.barang} type="purple" />
        <StatCard title="Barang Masuk" value={stats.masuk} type="green" />
        <StatCard title="Barang Keluar" value={stats.keluar} type="orange" />
        <StatCard title="Jenis Barang" value={stats.jenis} type="blue" />
        <StatCard title="Satuan" value={stats.satuan} type="cyan" />
      </section>

      <StockTable data={stocks} />
    </>
  );
}
