"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import "./Pagination.scss";

interface Props {
  totalPages: number;
  page: number;
  onPageChange?: (page: number) => void;
}

function PaginationDashboard({ totalPages, page, onPageChange }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createHref = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPages = () => {
    const current = page || 1;
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, current - half);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination__container">
        {page > 1 && (
          <Link
            href={createHref(page - 1)}
            className="link-redireccion"
            onClick={() => onPageChange?.(page - 1)}
            scroll={false}
            replace
          >
            &laquo;
          </Link>
        )}

        {getPages().map((pageItem, index) =>
          pageItem === "..." ? (
            <span key={`dots-${index}`} className="pagination-ellipsis">
              ...
            </span>
          ) : (
            <Link
              key={pageItem}
              href={createHref(Number(pageItem))}
              onClick={() => onPageChange?.(Number(pageItem))}
              className={`link-redireccion ${
                page === pageItem ? "active" : ""
              }`}
              scroll={false}
              replace
            >
              {pageItem}
            </Link>
          )
        )}

        {page < totalPages && (
          <Link
            href={createHref(page + 1)}
            className="link-redireccion"
            onClick={() => onPageChange?.(page + 1)}
            scroll={false}
            replace
          >
            &raquo;
          </Link>
        )}
      </div>
    </div>
  );
}

export default PaginationDashboard;
