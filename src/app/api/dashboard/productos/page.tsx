"use client";
import { KeyboardEvent, useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GoPencil } from "react-icons/go";

import StructureDashboard from "@/production/Dashboard/components/StructureDashboard";
import Filters from "@/production/Dashboard/components/Filter/Filters";
import TableDashboard from "@/production/Dashboard/components/Tables/TableDashboard";
import PaginationDashboard from "@/production/Dashboard/components/Pagination/Pagination";
import AddNewProduct from "@/production/Dashboard/components/Modals/Product/AddNewProduct";
import UpdateProductModal from "@/production/Dashboard/components/Modals/Product/UpdateProduct";
import useProducts from "@/production/Hooks/useProducts";
import {
  Product,
  ProductFilter,
} from "@/Insfraestructure/Interfaces/products/product.interface";
import LoadingState from "@/production/Dashboard/components/shared/LoadingState";
import ErrorState from "@/production/Dashboard/components/shared/ErrorState";
import EmptyState from "@/production/Dashboard/components/shared/EmptyState";
import NoResultsState from "@/production/Dashboard/components/shared/NoResultsState";

const CONDITIONS = { search: true, order: true };
const HEADERS = ["Nombre", "Precio", "Estado", "Acciones"];
const COUNT_LIMIT = 20;

function DashboardProductos() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchName, setSearchName] = useState<string>("");
  const [addProduct, setAddProduct] = useState<boolean>(false);
  const [updateProduct, setUpdateProduct] = useState<boolean>(false);
  const [dataProduct, setDataProduct] = useState<Product>({} as Product);

  const currentPage = useMemo(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page, 10) : 1;
  }, [searchParams]);

  const paramsProduct: ProductFilter = useMemo(
    () => ({
      ...Object.fromEntries(searchParams),
      page: currentPage,
      limit: COUNT_LIMIT,
    }),
    [searchParams, currentPage]
  );

  const { products } = useProducts(undefined, paramsProduct);

  const currentSearchTerm = searchParams.get("name") || "";

  const handlePageChange = useCallback((newPage: number) => {
    console.log("Página cambiada a:", newPage);
  }, []);

  const handleAddProduct = useCallback(() => setAddProduct(true), []);
  const handleAddProductClose = useCallback(() => setAddProduct(false), []);

  const handleUpdateProduct = useCallback((product: Product) => {
    setUpdateProduct(true);
    setDataProduct(product);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchName("");
    const params = new URLSearchParams(searchParams);
    params.delete("name");
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const params = new URLSearchParams(searchParams);
        if (searchName.trim()) {
          params.set("name", searchName.trim());
        } else {
          params.delete("name");
        }
        router.push(`?${params.toString()}`);
      }
    },
    [searchParams, router, searchName]
  );

  if (products.isLoading) {
    return (
      <StructureDashboard title="Productos">
        <LoadingState />
      </StructureDashboard>
    );
  }

  if (products.isError) {
    return (
      <StructureDashboard title="Productos">
        <ErrorState error={products.error} onRetry={products.refetch} />
      </StructureDashboard>
    );
  }

  const hasProducts =
    products.data?.products && products.data.products.length > 0;
  const isSearchingInServer = Boolean(currentSearchTerm);

  if (!hasProducts && !isSearchingInServer) {
    return (
      <StructureDashboard title="Productos">
        <Filters
          {...CONDITIONS}
          searchName={searchName}
          setSearchName={setSearchName}
          onAddResource={handleAddProduct}
          nameResource="Producto"
          onKeyDown={onKeyDown}
        />
        <EmptyState onAdd={handleAddProduct} />
        {addProduct && <AddNewProduct onClose={handleAddProductClose} />}
      </StructureDashboard>
    );
  }

  return (
    <StructureDashboard title="Productos">
      <Filters
        {...CONDITIONS}
        searchName={searchName}
        setSearchName={setSearchName}
        onAddResource={handleAddProduct}
        nameResource="Producto"
        onKeyDown={onKeyDown}
      />

      {isSearchingInServer && !hasProducts ? (
        <NoResultsState
          searchTerm={currentSearchTerm}
          onClear={handleClearSearch}
        />
      ) : (
        <>
          <TableDashboard
            headers={HEADERS}
            rows={
              products.data?.products?.map((product, index) => (
                <tr key={product.id || index} className="table-row">
                  <td className="row-data">{product.name}</td>
                  <td className="row-data">${product.basePrice}</td>
                  <td className="row-data">{product.status}</td>
                  <td className="update-delete">
                    <div
                      className="icono"
                      onClick={() => handleUpdateProduct(product)}
                    >
                      <GoPencil className="icon" />
                    </div>
                  </td>
                </tr>
              )) || []
            }
          />

          {products.data && products.data.totalPages > 1 && (
            <PaginationDashboard
              totalPages={products.data.totalPages}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {addProduct && <AddNewProduct onClose={handleAddProductClose} />}
      {updateProduct && (
        <UpdateProductModal
          onClose={() => setUpdateProduct(false)}
          userData={dataProduct}
        />
      )}
    </StructureDashboard>
  );
}

export default DashboardProductos;
