"use client";
import { useCallback, useMemo, useState } from "react";
import { GoPencil } from "react-icons/go";

import StructureDashboard from "@/production/Dashboard/components/StructureDashboard";
import { CategoryInterface } from "@/Insfraestructure/Interfaces/Resources/Categories-interface";
import ErrorState from "@/production/Dashboard/components/shared/ErrorState";
import LoadingState from "@/production/Dashboard/components/shared/LoadingState";
import useCategories from "@/production/Hooks/useCategories";
import Filters from "@/production/Dashboard/components/Filter/Filters";
import TableDashboard from "@/production/Dashboard/components/Tables/TableDashboard";
import EmptyState from "@/production/Dashboard/components/shared/EmptyState";
import AddCategory from "@/production/Dashboard/components/Modals/Category/AddCategory";
import UpdateModalCategory from "@/production/Dashboard/components/Modals/Category/UpdateCategory";
import { CiTrash } from "react-icons/ci";
import Toast from "@/Shared/Components/Toast";

const CONDITIONS = { search: true, order: false } as const;
const HEADERS = ["Nombre", "Slug", "Categoría Padre", "Acciones"];
const TIMEOUT = 2600;

const useFilteredCategories = (
  categories: CategoryInterface[],
  searchName: string
) => {
  return useMemo(() => {
    if (!categories?.length) return [];
    if (!searchName.trim()) return categories;

    const normalizedSearch = searchName.toLowerCase().trim();
    return categories.filter((category) =>
      category.name.toLowerCase().includes(normalizedSearch)
    );
  }, [categories, searchName]);
};

const CategoryTableRows = ({
  categories,
  onUpdateCategory,
  handleDeleteCategory,
}: {
  categories: any[];
  onUpdateCategory: (category: CategoryInterface) => void;
  handleDeleteCategory: (id: string) => void;
}) => {
  return useMemo(() => {
    if (!categories.length) return [];

    return categories.map((category) => (
      <tr key={category.id} className="table-row">
        <td className="row-data">{category.name}</td>
        <td className="row-data">{category.slug}</td>
        <td className="row-data">
          {category.parent_id || "Sin categoría padre"}
        </td>
        <td className="update-delete">
          <button
            type="button"
            className="icono"
            aria-label={`Eliminar categoria ${category.name}`}
            onClick={() => handleDeleteCategory(category.id)}
          >
            <CiTrash className="icon" />
          </button>
          <button
            type="button"
            className="icono"
            onClick={() => onUpdateCategory(category)}
            aria-label={`Editar categoria ${category.name}`}
          >
            <GoPencil className="icon" />
          </button>
        </td>
      </tr>
    ));
  }, [categories, onUpdateCategory]);
};

function DashboardCategorias() {
  const { categories, deleteCategory } = useCategories();
  const [searchName, setSearchName] = useState<string>("");
  const [isOpenUpdateOrCreate, setIsOpenUpdateOrCreate] = useState({
    isAdd: false,
    isUpdate: false,
  });
  const [dataCat, setDataCat] = useState<CategoryInterface>();
  const [toast, setToast] = useState({
    message: "",
    error: false,
  });

  const filteredCategories = useFilteredCategories(
    categories.data ?? [],
    searchName
  );

  const onUpdateCategory = useCallback(
    (category: CategoryInterface) => {
      setDataCat(category);
      setIsOpenUpdateOrCreate({ ...isOpenUpdateOrCreate, isUpdate: true });
    },
    [isOpenUpdateOrCreate]
  );

  const handleAddCategory = useCallback(() => {
    setIsOpenUpdateOrCreate({ ...isOpenUpdateOrCreate, isAdd: true });
  }, [isOpenUpdateOrCreate]);

  const handleDeleteCategory = useCallback(
    (id: string) => {
      deleteCategory.mutate(id, {
        onSuccess: () => {
          setToast({
            message: "Categoria eliminada exitosamente",
            error: false,
          });
          setTimeout(() => {
            setToast({ message: "", error: false });
          }, TIMEOUT);
        },
        onError: () => {
          setToast({ message: "Error al eliminar la categoria", error: true });
          setTimeout(() => {
            setToast({ message: "", error: false });
          }, TIMEOUT);
        },
      });
    },
    [deleteCategory]
  );

  const NoSearchResults = () => <EmptyState onAdd={handleAddCategory} />;

  const renderContent = useMemo(() => {
    if (categories.isLoading) {
      return <LoadingState />;
    }

    if (categories.isError) {
      return (
        <ErrorState error={categories.error} onRetry={categories.refetch} />
      );
    }

    if (!categories.data?.length) {
      return <EmptyState onAdd={handleAddCategory} />;
    }

    const tableRows =
      filteredCategories.length > 0 ? (
        <CategoryTableRows
          categories={filteredCategories}
          onUpdateCategory={onUpdateCategory}
          handleDeleteCategory={handleDeleteCategory}
        />
      ) : (
        []
      );

    return (
      <>
        <Filters
          {...CONDITIONS}
          searchName={searchName}
          setSearchName={setSearchName}
          onAddResource={handleAddCategory}
          nameResource="Categoria"
        />

        {filteredCategories.length > 0 ? (
          <TableDashboard headers={HEADERS} rows={tableRows} />
        ) : searchName.trim() ? (
          <NoSearchResults />
        ) : (
          <TableDashboard headers={HEADERS} rows={tableRows} />
        )}
      </>
    );
  }, [
    categories.isLoading,
    categories.isError,
    categories.error,
    categories.refetch,
    categories.data?.length,
    filteredCategories,
    searchName,
    handleAddCategory,
    onUpdateCategory,
  ]);

  const openAddCategory = () => {
    return (
      <>
        {isOpenUpdateOrCreate.isAdd && (
          <AddCategory
            onClose={() =>
              setIsOpenUpdateOrCreate({ ...isOpenUpdateOrCreate, isAdd: false })
            }
          />
        )}
      </>
    );
  };

  const openUpdateCategory = () => {
    return (
      <>
        {isOpenUpdateOrCreate.isUpdate && (
          <UpdateModalCategory
            onClose={() =>
              setIsOpenUpdateOrCreate({
                ...isOpenUpdateOrCreate,
                isUpdate: false,
              })
            }
            categoryData={dataCat!}
          />
        )}
      </>
    );
  };

  const openToast = () => {
    return (
      <>
        {toast.message && <Toast message={toast.message} error={toast.error} />}
      </>
    );
  };

  return (
    <StructureDashboard title="Categorias">
      {renderContent}
      {openAddCategory()}
      {openUpdateCategory()}
      {openToast()}
    </StructureDashboard>
  );
}

export default DashboardCategorias;
