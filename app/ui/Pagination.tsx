type Props = {
  page: number;
  total: number;
  pageSize: number;
  search: string;
};

export default function Pagination({
  page,
  total,
  pageSize,
  search,
}: Props) {
  const totalPages = Math.ceil(total / pageSize);

  // ⛔ Tidak render pagination jika cuma 1 page
  if (totalPages <= 1) return null;

  const query = search ? `&search=${encodeURIComponent(search)}` : "";

  return (
    <div className="pagination">
      {/* PREV */}
      {page > 1 && (
        <a
          href={`/dashboard/barang?page=${page - 1}${query}`}
          className="page-btn"
        >
          ‹ Prev
        </a>
      )}

      {/* PAGE NUMBER */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        return (
          <a
            key={p}
            href={`/dashboard/barang?page=${p}${query}`}
            className={`page-btn ${p === page ? "active" : ""}`}
          >
            {p}
          </a>
        );
      })}

      {/* NEXT */}
      {page < totalPages && (
        <a
          href={`/dashboard/barang?page=${page + 1}${query}`}
          className="page-btn"
        >
          Next ›
        </a>
      )}
    </div>
  );
}
