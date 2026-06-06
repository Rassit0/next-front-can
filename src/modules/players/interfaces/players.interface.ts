export interface IPlayersResponse {
  data: IPlayer[];
  meta: Meta;
}

export interface IPlayer {
  id: string;
  person: IPerson;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type Gender = "MALE" | "FEMALE";
export type DocumentType = "CI" | "NIT";

export interface IPerson {
  id: string;
  name: string;
  lastName: string;
  secondLastName: string;
  birthDate: null | Date;
  imageUrl: null | string;
  documentType: DocumentType;
  documentNumber: string;
  email: null | string;
  phone: null | string;
  address: null | string;
  gender: Gender;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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
