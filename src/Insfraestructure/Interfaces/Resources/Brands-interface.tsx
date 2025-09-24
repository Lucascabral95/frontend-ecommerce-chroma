export interface BrandInterface {
  id: string;
  name: string;
  slug: string;
}

export interface CreateBrandInterface {
  name: string;
  slug?: string;
}

export interface UpdateBrandInterface {
  name?: string;
  slug?: string;
}
