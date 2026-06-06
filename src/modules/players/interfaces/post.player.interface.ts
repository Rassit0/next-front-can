import { DocumentType, Gender } from "./players.interface";

export interface PostPlayerInterface {
  person: {
    name: string;
    lastName: string;
    secondLastName: null | string;
    birthDate: Date;
    imageUrl: null | File;
    documentType: DocumentType;
    documentNumber: string;
    email: null | string;
    phone: null | string;
    address: null | string;
    gender: Gender;
  };
  isActive: boolean;
}
