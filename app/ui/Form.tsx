export default function Form({
  action,
  defaultValues,
  submitText,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: any;
  submitText: string;
}) {
  return (
    <form action={action} className="form-box">
      {defaultValues?.id && (
        <input type="hidden" name="id" value={defaultValues.id} />
      )}

      <div className="form-group">
        <label>Nama Barang</label>
        <input name="nama" defaultValue={defaultValues?.nama} required />
      </div>

      <div className="form-group">
        <label>Jenis</label>
        <input name="jenis" defaultValue={defaultValues?.jenis} required />
      </div>

      <div className="form-group">
        <label>Stok</label>
        <input
          type="number"
          name="stok"
          defaultValue={defaultValues?.stok}
          min={0}
          required
        />
      </div>

      <div className="form-group">
        <label>Satuan</label>
        <input name="satuan" defaultValue={defaultValues?.satuan} required />
      </div>

      <button className="btn-primary">{submitText}</button>
    </form>
  );
}
