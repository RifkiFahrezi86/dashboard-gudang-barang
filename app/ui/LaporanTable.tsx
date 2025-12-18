import {
  getStockStatus,
  getStockLabel,
  DEFAULT_STOCK_LIMIT,
} from "@/app/lib/stock";

type Item = {
  id: string;
  nama: string;
  jenis: string;
  stok: number;
  satuan: string;
};

export default function LaporanTable({ data }: { data: Item[] }) {
  return (
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
          {data.map((item) => {
            const status = getStockStatus(
              item.stok,
              DEFAULT_STOCK_LIMIT
            );

            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.jenis}</td>

                <td>
                  <span className={`badge ${status}`}>
                    {item.stok}
                  </span>
                </td>

                <td>{item.satuan}</td>

                <td>
                  <span className={`status ${status}`}>
                    {getStockLabel(status)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
