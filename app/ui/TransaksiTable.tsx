import { Transaksi } from "@/app/lib/types";
import ApprovalButtons from "./ApprovalButtons";

export default function TransaksiTable({
  data,
}: {
  data: Transaksi[];
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "pending";
      case "approved":
        return "approved";
      case "rejected":
        return "rejected";
      default:
        return "";
    }
  };

  const formatDate = (tanggal: string) => {
    try {
      return new Date(tanggal).toLocaleDateString("id-ID");
    } catch {
      return tanggal;
    }
  };

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
            <th>Aksi</th> 
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                Tidak ada data transaksi
              </td>
            </tr>
          ) : (
            data.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.nama}</td>
                <td>{item.jenis}</td>
                <td>
                  <span className="badge-info">{item.jumlah}</span>
                </td>
                <td>{item.sumber || item.tujuan || "-"}</td>
                <td>
                  <span className={`badge ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td>{formatDate(item.tanggal)}</td>

                {/* ✅ INI YANG BELUM ADA DI KODE KAMU */}
                <td>
                  <ApprovalButtons
                    id={item.id}
                    type={item.sumber ? "masuk" : "keluar"}
                    status={item.status}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
