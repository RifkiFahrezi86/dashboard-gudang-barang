import { Barang } from "@/app/lib/types";
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

type Props = {
  data: Item[];
  limit?: number;
};

export default function StockTable({ data, limit = 10 }: Props) {
  return (
    <section className="table-box">
      <h3>
        Stok barang telah mencapai batas minimum{" "}
        <span className="hint">({limit})</span>
      </h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Barang</th>
            <th>Jenis</th>
            <th>Stok</th>
            <th>Satuan</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", opacity: 0.6 }}>
                Tidak ada barang dengan stok rendah
              </td>
            </tr>
          ) : (
            data.map((item) => {
            const status = getStockStatus(item.stok, DEFAULT_STOCK_LIMIT);
            <span className={`status ${status}`}>
              {getStockLabel(status)}
            </span>

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
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </section>
  );
}
