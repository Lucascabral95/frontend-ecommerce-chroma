export interface ColorInterface {
  id: string;
  name: string;
  hex?: string;
}

export interface CreateColorInterface {
  name: string;
  hex?: string;
}

export interface UpdateColorInterface {
  name?: string;
  hex?: string;
}
