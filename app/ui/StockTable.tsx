type Item = {
  id: string;
  nama: string;
  jenis: string;
  stok: number;
  satuan: string;
};

export default function StockTable({ data }: { data: Item[] }) {
  return (
    <section className="table-box">
      <h3>Stok barang telah mencapai batas minimum</h3>

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
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
