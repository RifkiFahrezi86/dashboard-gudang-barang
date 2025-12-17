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

const current =
  Object.entries(headerMap)
    .sort((a, b) => b[0].length - a[0].length) // ⬅️ PENTING
    .find(([key]) => pathname.startsWith(key))
    ?.[1] ?? {
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
