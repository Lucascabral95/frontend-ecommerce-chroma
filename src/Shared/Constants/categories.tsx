interface Category {
  value: string;
  label: string;
}

export const CATEGORIES: Category[] = [
  { value: "", label: "Seleccionar categoría" },
  { value: "1a2b3c4d-5e6f-4789-a012-123456789abc", label: "Sweater" },
  { value: "2b3c4d5e-6f7a-4890-b123-23456789abcd", label: "Camperas" },
  {
    value: "3c4d5e6f-7a8b-4901-c234-3456789abcde",
    label: "Remeras Manga Larga",
  },
  { value: "5e6f7a8b-9c0d-4123-e456-56789abcdef0", label: "Sobretodos" },
  { value: "6fddfssdf-0d1e-4234-f567-6789abcdef01", label: "Sacos" },
  { value: "6f7a8b9c-0d1e-32432-f567-6789abcdef01", label: "Jeans" },
  {
    value: "6f7a8b9c-0d1e-4234-f567-6789abcdef01",
    label: "Pantalones de Vestir",
  },
  { value: "6f7a8b9c-0d1e-4234-2222-6789abcdef01", label: "Camisas de Vestir" },
  { value: "6f7a8b9c-0q23d1e-4234-2222-6789abcdef82", label: "Trajes" },
  { value: "6f7a8b9c-uygw7u83-4234-2222-6789abcdes83", label: "Chombas" },
];

interface Brand {
  id: string;
  name: string;
  slug: string;
}

export const BRANDS: Brand[] = [
  { id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", name: "Devré", slug: "devre" },
];

// Functions returns
export const getBrandNameById = (brandId: string | undefined): string => {
  const brand = BRANDS.find((brand) => brand.id === brandId);
  return brand ? brand.name : "Sin marca";
};

export const getCategoryById = (categoryId: string | undefined): string => {
  const category = CATEGORIES.find((category) => category.value === categoryId);
  return category ? category.label : "Sin categoría";
};
