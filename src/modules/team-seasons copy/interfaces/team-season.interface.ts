export interface ITeamSeasonResponse {
  data: ITeamSeason[];
  meta: Meta;
  message: string;
}

export type Gender = "MALE" | "FEMALE" | "MIXED";

export interface ITeamSeason {
  id: string;
  gender: Gender;
  team: Category;
  category: Category;
  season: Season;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
}

export interface Season {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface Meta {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: null | number;
  prevPage: null | number;
}
