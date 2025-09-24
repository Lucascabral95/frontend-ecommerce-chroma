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

interface Color {
  id: string;
  name: string;
  hex: string;
}

export const COLORS: Color[] = [
  {
    id: "04f1c0b7-2cde-4e8a-8d3f-9a6b51c27e91",
    name: "Negro",
    hex: "#000000",
  },
  {
    id: "15a2d1c8-3def-4f9b-9e40-0b7c62d38fa2",
    name: "Blanco",
    hex: "#FFFFFF",
  },
  {
    id: "26b3e2d9-4e00-4a0c-8f51-1c8d73e49ab3",
    name: "Azul Marino",
    hex: "#0B2742",
  },
  {
    id: "37c4f3ea-5f11-4b1d-9a62-2d9e84f5bc14",
    name: "Azul",
    hex: "#1F4E79",
  },
  {
    id: "48d504fb-6022-4c2e-8b73-3eaf95g6cd25",
    name: "Celeste",
    hex: "#7FB3D5",
  },
  {
    id: "59e6150c-7133-4d3f-9c84-4fb0a6h7de36",
    name: "Gris Oscuro",
    hex: "#4A4A4A",
  },
  {
    id: "6af7261d-8244-4e40-8d95-50c1b7i8ef47",
    name: "Gris",
    hex: "#808080",
  },
  {
    id: "7b08372e-9355-4f51-9ea6-61d2c8j9f058",
    name: "Gris Claro",
    hex: "#B3B3B3",
  },
  {
    id: "8c19483f-a466-4052-8fb7-72e3d90a0169",
    name: "Bordó",
    hex: "#7A263A",
  },
  {
    id: "9d2a5940-b577-4153-9gc8-83f4ea1b127a",
    name: "Verde Oliva",
    hex: "#556B2F",
  },
  {
    id: "ae3b6a51-c688-4254-8hd9-94g5fb2c238b",
    name: "Beige",
    hex: "#D8C3A5",
  },
  {
    id: "bf4c7b62-d799-4355-9ie0-a5h60c3d349c",
    name: "Tostado",
    hex: "#C9A26B",
  },
  {
    id: "c05d8c73-e8aa-4456-8jf1-b6i71d4e45ad",
    name: "Marrón",
    hex: "#5A3E2B",
  },
  {
    id: "4b5a6c7d-8e9f-4012-a3b4-c5d6e7f80123",
    name: "Verde",
    hex: "#008000",
  },
];

export const SIZES = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
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

export const getColorById = (colorId: string | undefined): string => {
  const color = COLORS.find((color) => color.id === colorId);
  return color ? color.name : "Sin color";
};
