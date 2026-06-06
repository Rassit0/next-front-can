export type GroupStatus =
  | "PLANNING" // El curso/equipo se está armando (no visible para el público)
  | "ACTIVE" // Abierto, pasando clases y aceptando inscripciones regularmente
  | "FULL" // Clases activas, pero ya alcanzó el límite (no acepta más inscripciones)
  | "CLOSURE" // Clases activas, pero la secretaría cerró inscripciones por fecha límite
  | "FINISHED"; // El curso terminó o la temporada cerró (pasa al historial, bloqueado)

export type GroupType =
  | "TEAM" // Equipo
  | "COURSE"; // Curso

export type ActivitySkillLevel =
  | "BEGINNER" // Principiante
  | "INTERMEDIATE" // Intermedio
  | "ADVANCED" // Avanzado
  | "ELITE" // Avanzado
  | "NA"; // No aplica

export interface IActivitiesResponse {
  data: IGroup[];
  meta: Meta;
  message: string;
}

export interface IGroup {
  id: number;
  imageUrl: string | null;
  name: string;
  type: GroupType;
  level: ActivitySkillLevel;
  maxMembers: number;
  minMembers: number;
  totalPrice: string;
  monthlyPrice: string;
  registrationFee: string;
  status: GroupStatus;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
  category: Category;
  sportProgram: SportProgram;
  groupActivities: GroupActivity[];
}

export interface Category {
  id: number;
  name: string;
  minAge: number;
  maxAge: number;
}

export interface SportProgram {
  organization: Organization;
  discipline: Discipline;
}

export interface Organization {
  id: number;
  name: string;
}

export interface Discipline {
  id: number;
  name: string;
}

export interface GroupActivity {
  activity: Activity;
}

export interface Activity {
  id: number;
  name: string;
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

export interface IGroupSummary {
  totalActivities: number;
  publishedActivities: number;
  finishedActivities: number;
  cancelledActivities: number;
}
