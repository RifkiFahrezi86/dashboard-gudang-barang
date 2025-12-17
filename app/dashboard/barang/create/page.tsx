import Header from "@/app/ui/Header";
import { createBarang } from "@/app/lib/actions";

export default function CreateBarangPage() {
  return (
    <>
      <Header title="Tambah Barang" />

      <section className="form-box">
        <form action={createBarang} className="form-grid">
          
          <div className="form-group">
            <label>ID Barang</label>
            <input
              type="text"
              name="id"
              placeholder="B0007"
              required
            />
          </div>

          <div className="form-group">
            <label>Nama Barang</label>
            <input
              type="text"
              name="nama"
              placeholder="Contoh: Amonia Cair"
              required
            />
          </div>

          <div className="form-group">
            <label>Jenis Barang</label>
            <input
              type="text"
              name="jenis"
              placeholder="Contoh: Bahan Kimia"
              required
            />
          </div>

          <div className="form-group">
            <label>Stok Awal</label>
            <input
              type="number"
              name="stok"
              min={0}
              required
            />
          </div>

          <div className="form-group">
            <label>Satuan</label>
            <input
              type="text"
              name="satuan"
              placeholder="Liter / Kg / Unit"
              required
            />
          </div>

          <div className="form-action">
            <button type="submit" className="btn-primary">
              Simpan Barang
            </button>
          </div>

        </form>
      </section>
    </>
  );
}
