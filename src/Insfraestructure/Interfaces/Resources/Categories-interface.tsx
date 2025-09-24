export interface CategoryInterface {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
}

export interface CreateCategoryInterface {
  name: string;
  parentId?: string;
}

export interface UpdateCategoryInterface {
  name?: string;
  parentId?: string;
}
