export async function getDashboardStats() {
  return {
    barang: 10,
    masuk: 11,
    keluar: 14,
    jenis: 14,
    satuan: 10,
  };
}

export async function getLowStock() {
  return [
    {
      id: "B0004",
      nama: "Gesapax 500 SC",
      jenis: "Herbisida",
      stok: 10,
      satuan: "Liter",
    },
    {
      id: "B0005",
      nama: "Amonia Cair",
      jenis: "Bahan Kimia",
      stok: 5,
      satuan: "Liter",
    },
  ];
}
