interface ArrayInterface {
  id: string;
  name: string;
  link?: string;
}

export const categoriesArray: ArrayInterface[] = [
  {
    id: "1a2b3c4d-5e6f-4789-a012-123456789abc",
    name: "Sweater",
  },
  {
    id: "2b3c4d5e-6f7a-4890-b123-23456789abcd",
    name: "Camperas",
  },
  {
    id: "5e6f7a8b-9c0d-4123-e456-56789abcdef0",
    name: "Sobretodos",
  },
  {
    id: "6fddfssdf-0d1e-4234-f567-6789abcdef01",
    name: "Sacos",
  },
  {
    id: "6f7a8b9c-0d1e-32432-f567-6789abcdef01",
    name: "Jeans",
  },
  {
    id: "6f7a8b9c-0d1e-4234-f567-6789abcdef01",
    name: "Pantalones de Vestir",
  },
  {
    id: "6f7a8b9c-0d1e-4234-2222-6789abcdef01",
    name: "Camisas de Vestir",
  },
  {
    id: "6f7a8b9c-0q23d1e-4234-2222-6789abcdef82",
    name: "Trajes",
  },
  {
    id: "6f7a8b9c-uygw7u83-4234-2222-6789abcdes83",
    name: "Chombas",
  },
];

export const sizes: ArrayInterface[] = [
  {
    id: "1",
    name: "XS",
  },
  {
    id: "2",
    name: "S",
  },
  {
    id: "3",
    name: "M",
  },
  {
    id: "4",
    name: "L",
  },
  {
    id: "5",
    name: "XL",
  },
  {
    id: "6",
    name: "XXL",
  },
];

export const brands: ArrayInterface[] = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    name: "Devré",
    link: "/section/product/all?brandId=f47ac10b-58cc-4372-a567-0e02b2c3d479",
  },
];
