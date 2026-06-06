export interface ICategoriesResponse {
  data: ICategory[];
  meta: Meta;
  message: string;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  minAge: number;
  maxAge: number;
  gender: Gender;
  isActive: boolean;
}

export type Gender = "MALE" | "FEMALE" | "MIXED";

export interface Meta {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}
