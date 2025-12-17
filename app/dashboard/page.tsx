import Header from "@/app/ui/Header";
import StatCard from "@/app/ui/StatCard";
import StockTable from "@/app/ui/StockTable";
import Chart from "@/app/ui/Chart";

import {
  getDashboardStats,
  getLowStock,
  getChartData,
} from "@/app/lib/db";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const stocks = await getLowStock();
  const chart = await getChartData(); 
;

  return (
    <>
     <Header />
      <section className="cards">
        <StatCard title="Data Barang" value={stats.barang} type="purple" />
        <StatCard title="Barang Masuk" value={stats.masuk} type="green" />
        <StatCard title="Barang Keluar" value={stats.keluar} type="orange" />
        <StatCard title="Jenis Barang" value={stats.jenis} type="blue" />
        <StatCard title="Satuan" value={stats.satuan} type="cyan" />
      </section>

      <Chart data={chart} />

      <StockTable data={stocks} limit={10} />

    </>
  );
}
