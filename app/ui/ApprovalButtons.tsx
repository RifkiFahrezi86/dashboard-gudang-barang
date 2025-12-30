"use client";

import {
  approveBarangMasuk,
  rejectBarangMasuk,
  approveBarangKeluar,
  rejectBarangKeluar,
} from "@/app/lib/actions";

export default function ApprovalButtons({
  id,
  type,
  status,
}: {
  id: number;
  type: "masuk" | "keluar";
  status: string;
}) {
  if (status !== "pending") {
    return <span className="status-label">{status}</span>;
  }
  return (
    <div className="action-buttons">
      <button
        className="btn-approve"
        onClick={() =>
          type === "masuk"
            ? approveBarangMasuk(id)
            : approveBarangKeluar(id)
        }
      >
          Approve
      </button>
      <button
        className="btn-reject"
        onClick={() =>
          type === "masuk"
            ? rejectBarangMasuk(id)
            : rejectBarangKeluar(id)
        }
      >
        Reject
      </button>
    </div>
  );
}
