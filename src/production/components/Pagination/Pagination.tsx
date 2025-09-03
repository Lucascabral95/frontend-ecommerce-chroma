import React from "react";

import "./Pagination.scss";
import Link from "next/link";

interface Props {
  totalPages: number;
  page: number;
  onPageChange?: (page: number) => void;
  categoryId: string;
}

function Pagination({ totalPages, page, onPageChange, categoryId }: Props) {
  return (
    <div className="pagination">
      <div className="pagination__container">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            key={i}
            onClick={() => onPageChange?.(i + 1)}
            href={`/section/product/${categoryId}?${new URLSearchParams({
              page: (i + 1).toString(),
            })}`}
            className={
              page === i + 1 ? "link-redireccion active" : "link-redireccion"
            }
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
