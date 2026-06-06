export interface ISeasonsResponse {
  data: ISeason[];
  meta: Meta;
  message: string;
}

export type ISeasonStatus = "DRAFT" | "ACTIVE" | "FINISHED" | "CANCELLED";

export interface ISeason {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: ISeasonStatus;
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
  nextPage: null | number;
  prevPage: null | number;
}
