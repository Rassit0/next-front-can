export interface ITeamsResponse {
  data: ITeam[];
  meta: Meta;
  message: string;
}

export type Gender = "MALE" | "FEMALE" | "MIXED";

export interface ITeam {
  id: string;
  name: string;
  club: Club;
  gender: Gender;
  createdAt: Date;
  updatedAt: Date;
}

export interface Club {
  id: string;
  name: string;
  discipline: Discipline;
}

export interface Discipline {
  id: string;
  name: string;
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
