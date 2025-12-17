export default function Search({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  return (
    <form className="search-form">
      <input
        name="search"
        defaultValue={defaultValue}
        placeholder="Cari barang..."
        className="search-input"
      />
      <button className="btn-search">Cari</button>
    </form>
  );
}
