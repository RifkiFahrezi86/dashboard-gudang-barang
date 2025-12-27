"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { logoutUser } from "@/app/lib/actions";

const menu = [
  {
    section: "MAIN",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: "/icons/dashboard-side.svg",
      },
    ],
  },
  {
    section: "MASTER",
    items: [
      {
        label: "Barang",
        href: "/dashboard/barang",
        icon: "/icons/barang.svg",
      },
    ],
  },
  {
    section: "TRANSAKSI",
    items: [
      {
        label: "Barang Masuk",
        href: "/dashboard/barang-masuk",
        icon: "/icons/barang-masuk.svg",
      },
      {
        label: "Barang Keluar",
        href: "/dashboard/barang-keluar",
        icon: "/icons/barang-keluar.svg",
      },
    ],
  },
  {
    section: "LAPORAN",
    items: [
      {
        label: "Laporan Stok",
        href: "/dashboard/laporan",
        icon: "/icons/report-stock.svg",
      },
    ],
  },
  {
    section: "PENGATURAN",
    items: [
      {
        label: "Manajemen User",
        href: "/dashboard/users",
        icon: "/icons/user-manage.svg",
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">

      {/* 🔥 BRAND DENGAN LOGO */}
      <div className="brand brand-vertical">
        <Image
          src="/logo/gudang-logo.svg"
          alt="Gudang Barang"
          width={44}
          height={44}
          priority
  />
  <span>Gudang Barang</span>
</div>

      {menu.map((group) => (
        <div key={group.section}>
          <span className="section">{group.section}</span>

          {group.items.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${active ? "active" : ""}`}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={18}
                  height={18}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}

      <form action={logoutUser} className="logout-form">
        <button type="submit" className="logout-btn">
          Logout
        </button>
      </form>
    </aside>
  );
}
