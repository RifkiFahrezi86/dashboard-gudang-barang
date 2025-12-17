type Barang = {
  id: string;
  nama: string;
  jenis: string;
  stok: number;
  satuan: string;
};

export default function BarangTable({ data }: { data: Barang[] }) {
  return (
    <div className="table-box">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Jenis</th>
            <th>Stok</th>
            <th>Satuan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.jenis}</td>
              <td>
                <span className={`badge ${item.stok <= 5 ? "danger" : "warning"}`}>
                  {item.stok}
                </span>
              </td>
              <td>{item.satuan}</td>
              <td className="actions">
              <a href={`/dashboard/barang/${item.id}/edit`} title="Edit">
                ✏️
              </a>
              <a
                href={`/dashboard/barang/${item.id}/delete`}
                title="Hapus"
              >
                🗑️
              </a>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
