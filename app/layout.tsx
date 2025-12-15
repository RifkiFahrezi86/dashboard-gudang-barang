import "@/styles/globals.css";

export const metadata = {
  title: "Dashboard Gudang",
  description: "Sistem Persediaan Barang",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
