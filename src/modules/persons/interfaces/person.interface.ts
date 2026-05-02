export interface IPersonsResponse {
  data: IPerson[];
  meta: Meta;
}

export interface IPerson {
  id: number;
  ci: string;
  name: string;
  lastName: string;
  surName: string;
  email: null | string;
  phone: null | string;
  phoneEmergency: null | string;
  address: null | string;
  birthDate: null | Date;
  standardSize: null | UniformSize;
  imageUrl: null | string;
  createdAt: Date;
  updatedAt: Date;
  tutors: TutorElement[];
}

export type UniformSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

export interface TutorElement {
  tutor: ITutor;
}

export interface ITutor {
  id: number;
  name: string;
  lastName: string;
  surName: string;
  ci: string;
  phone: null;
  imageUrl: null;
}

export interface Meta {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
