import Header from "@/app/ui/Header";
import { getLaporanStok } from "@/app/lib/db";
import LaporanActions from "@/app/ui/LaporanActions";

export default async function LaporanStokPage() {
  const data = await getLaporanStok();

  return (
    <>
      <Header title="Laporan Stok" />
                      <LaporanActions />


      <section className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Jenis</th>
              <th>Stok</th>
              <th>Satuan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.jenis}</td>
                <td>
                  <span
                    className={
                      item.stok <= 5
                        ? "badge badge-danger"
                        : item.stok <= 10
                        ? "badge badge-warning"
                        : "badge badge-success"
                    }
                  >
                    {item.stok}
                  </span>
                </td>
                <td>{item.satuan}</td>
                <td>
                  {item.stok <= 5 ? (
                    <span className="status danger">Stok Menipis</span>
                  ) : (
                    <span className="status safe">Aman</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
