"use client";

export default function LaporanActions() {
  return (
    <div className="laporan-toolbar no-print">
      <button
        className="laporan-btn print"
        onClick={() => window.print()}
      >
        🖨️ Cetak
      </button>

      <a
        href="/api/export/excel"
        className="laporan-btn excel"
      >
        📊 Export Excel
      </a>

      <a
        href="/api/export/pdf"
        className="laporan-btn pdf"
      >
        📄 Export PDF
      </a>
    </div>
  );
}
