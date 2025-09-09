"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import "./Pagination.scss";

interface Props {
  totalPages: number;
  page: number;
  onPageChange?: (page: number) => void;
  categoryId: string;
}

function Pagination({ totalPages, page, onPageChange, categoryId }: Props) {
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());

    const baseUrl =
      categoryId === "all"
        ? "/section/product/all"
        : `/section/product/${categoryId}`;

    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="pagination">
      <div className="pagination__container">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            key={i}
            onClick={() => onPageChange?.(i + 1)}
            href={createPageUrl(i + 1)}
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
