import Image from "next/image";

type StatCardProps = {
  title: string;
  value: number;
  type: "purple" | "green" | "orange" | "blue" | "cyan";
};

export default function StatCard({ title, value, type }: StatCardProps) {
  return (
    <div className="card">
      <div className={`icon ${type}`}>
        <Image
          src={getIcon(type)}
          alt={title}
          width={22}
          height={22}
        />
      </div>

      <div>
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
    </div>
  );
}

/* =========================
   HELPER ICON
========================= */
function getIcon(type: string) {
  switch (type) {
    case "purple":
      return "/icons/box.svg";          // Data Barang
    case "green":
      return "/icons/arrow-down.svg";   // Barang Masuk
    case "orange":
      return "/icons/arrow-up.svg";     // Barang Keluar
    case "blue":
      return "/icons/layers.svg";       // Jenis Barang
    case "cyan":
      return "/icons/scale.svg";        // Satuan
    default:
      return "/icons/box.svg";
  }
}
