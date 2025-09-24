"use client";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";

import StructureModal from "../StructureModal";
import useCategories from "@/production/Hooks/useCategories";
import { CreateCategoryInterface } from "@/Insfraestructure/Interfaces/Resources/Categories-interface";
import { CATEGORIES } from "@/Shared/Constants/categories";

interface Props {
  onClose: () => void;
}

const TIMEOUT_TOAST = 1200;

const initialDataCategory: CreateCategoryInterface = {
  name: "",
  parentId: "",
};

function AddCategory({ onClose }: Props) {
  const { createNewCategory } = useCategories();

  const categories = CATEGORIES;

  const [dataCategory, setDataCategory] =
    useState<CreateCategoryInterface>(initialDataCategory);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setDataCategory((prev) => ({ ...prev, [name]: value }));
      if (error) setError("");
    },
    [error]
  );

  const clearError = useCallback(() => {
    if (error) setError("");
  }, [error]);

  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isSubmitting) return;

      setIsSubmitting(true);
      setError("");

      createNewCategory.mutate(
        {
          name: dataCategory.name.trim(),
          parentId: dataCategory.parentId,
        },
        {
          onSuccess: () => {
            setSuccess(true);
            setIsSubmitting(false);
            setTimeout(onClose, TIMEOUT_TOAST);
          },
          onError: (err: any) => {
            setError(err?.message || "Error al agregar la categoría");
            setIsSubmitting(false);
          },
        }
      );
    },
    [dataCategory, createNewCategory, onClose, isSubmitting]
  );

  const buttonText = useMemo(() => {
    if (isSubmitting) return "Agregando...";
    if (success) return "✓ Creado";
    return "Agregar";
  }, [isSubmitting, success]);

  const isButtonDisabled = useMemo(() => {
    return isSubmitting || !dataCategory.name.trim() || !!error;
  }, [isSubmitting, dataCategory.name, error]);

  return (
    <StructureModal close={onClose} title="Agregar Categoría">
      <form className="form-inside" onSubmit={submit}>
        <div className="form-input-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            onFocus={clearError}
            placeholder="Ingrese el nombre"
            value={dataCategory.name}
            onChange={handleInputChange}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-input-group">
          <label htmlFor="parentId">Categoría Padre</label>
          <select
            name="parentId"
            id="parentId"
            onFocus={clearError}
            value={dataCategory.parentId}
            onChange={handleInputChange}
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
            style={{
              backgroundColor: success ? "green" : "",
              opacity: isButtonDisabled ? 0.6 : 1,
              cursor: isButtonDisabled ? "not-allowed" : "pointer",
            }}
            disabled={isButtonDisabled}
            type="submit"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </StructureModal>
  );
}

export default AddCategory;
