"use client";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

import { CategoryInterface } from "@/Insfraestructure/Interfaces/Resources/Categories-interface";
import StructureModal from "../StructureModal";
import { CATEGORIES } from "@/Shared/Constants/categories";
import useCategories from "@/production/Hooks/useCategories";

interface Props {
  onClose: () => void;
  categoryData: CategoryInterface;
}

const TIMEOUT = 1600;

function UpdateModalCategory({ onClose, categoryData }: Props) {
  const { updateCategory } = useCategories();

  const [categoryOldData, setCategoryOldData] =
    useState<CategoryInterface>(categoryData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const categories = CATEGORIES;

  const handleFieldChange = useCallback(
    (field: keyof CategoryInterface) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCategoryOldData((prev) => ({ ...prev, [field]: e.target.value }));
        if (error) setError("");
      },
    [error]
  );

  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isSubmitting) return;

      setIsSubmitting(true);
      setError("");

      const updateData = {
        name: categoryOldData.name.trim(),
        parentId: categoryOldData.parentId || null,
      };

      console.log(updateData);

      updateCategory.mutate(
        {
          id: categoryOldData.id,
          category: updateData,
        },
        {
          onSuccess: () => {
            setIsSubmitting(false);
            setSuccess(true);
            setTimeout(() => {
              onClose();
            }, TIMEOUT);
          },
          onError: (error: any) => {
            setError(
              error?.message || "Ocurrió un error al actualizar la categoría"
            );
            setIsSubmitting(false);
          },
        }
      );
    },
    [categoryOldData, updateCategory, onClose, isSubmitting]
  );

  return (
    <StructureModal title="Actualizar Categoria" close={onClose}>
      <form onSubmit={submit} className="form-inside">
        <div className="form-input-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ingrese el nombre"
            value={categoryOldData.name}
            onChange={handleFieldChange("name")}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-input-group">
          <label htmlFor="parentId">Categoría Padre</label>
          <select
            id="parentId"
            name="parentId"
            value={categoryOldData.parentId || ""}
            onChange={handleFieldChange("parentId")}
            disabled={isSubmitting}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {error && <p style={{ color: "red", margin: "8px 0" }}>{error}</p>}

        <div className="form-input-group">
          <button
            type="submit"
            disabled={isSubmitting || !categoryOldData.name.trim()}
            style={{
              opacity: isSubmitting ? 0.6 : 1,
              backgroundColor: success ? "green" : "",
            }}
          >
            {isSubmitting ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </form>
    </StructureModal>
  );
}

export default UpdateModalCategory;
