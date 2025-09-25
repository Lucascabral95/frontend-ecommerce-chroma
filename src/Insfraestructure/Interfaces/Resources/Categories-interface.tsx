export interface CategoryInterface {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
}

export interface CreateCategoryInterface {
  name: string;
  parentId?: string | null;
}

export interface UpdateCategoryInterface {
  name?: string;
  parentId?: string | null;
}
