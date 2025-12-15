"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

const headerMap: Record<
  string,
  { title: string; icon: string }
> = {
  "/dashboard": {
    title: "Dashboard",
    icon: "/icons/dashboard.svg",
  },
  "/dashboard/barang": {
    title: "Barang",
    icon: "/icons/box.svg",
  },
  "/dashboard/barang-masuk": {
    title: "Barang Masuk",
    icon: "/icons/Arrow-down.svg",
  },
  "/dashboard/barang-keluar": {
    title: "Barang Keluar",
    icon: "/icons/Arrow-up.svg",
  },
  "/dashboard/laporan": {
    title: "Laporan Stok",
    icon: "/icons/report.svg",
  },
  "/dashboard/users": {
    title: "Manajemen User",
    icon: "/icons/user-manage.svg",
  },
};

export default function Header() {
  const pathname = usePathname();

  // fallback jika route belum ada di map
  const current = headerMap[pathname] ?? {
    title: "Dashboard",
    icon: "/icons/dashboard.svg",
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-icon">
          <Image
            src={current.icon}
            alt={current.title}
            width={22}
            height={22}
          />
        </div>
        <h1>{current.title}</h1>
      </div>
    </header>
  );
}
