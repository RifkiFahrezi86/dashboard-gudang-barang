import { Transaksi } from "@/app/lib/types";

export default function TransaksiTable({
  data,
}: {
  data: Transaksi[];
}) {
  return (
    <div className="table-box">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Barang</th>
            <th>Jenis</th>
            <th>Jumlah</th>
            <th>Sumber / Tujuan</th>
            <th>Status</th>
            <th>Tanggal</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.nama}</td>
              <td>{item.jenis}</td>

              <td>
                <span className="badge-info">{item.jumlah}</span>
              </td>

              <td>{item.sumber || item.tujuan || "-"}</td>

              <td>
                <span className={`badge ${item.status}`}>
                  {item.status}
                </span>
              </td>

              <td>
                {new Date(item.tanggal).toLocaleDateString("id-ID")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
