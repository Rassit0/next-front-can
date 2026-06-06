import { ActivityStatus, ActivityType } from "./group.interface";
import { SkillLevel } from "../../../../../nest-gestion360/src/generated/prisma/enums";

export interface AddScheduleProps {
  id: string | number;
  specificDate?: Date | null;
  dayOfWeek?: number | null;
  startTime: string;
  endTime: string;
  locationId: number;
}

export interface AddMatchDetailProps {
  locationId: number;
  matchDate: Date;
  scoreHome: number;
  scoreAway: number;
}

export interface AddEducationalActivityProps {
  maxStudents: number;
  minStudents: number;
  teachersRequired: number;
  academicPeriod?: string | null;
}

export interface AddActivityProps {
  name: string;
  level?: SkillLevel;
  organizationId?: number;
  type: ActivityType;
  startDate: Date;
  endDate: Date;
  totalPrice: string;
  monthlyPrice: string;
  registrationFee: string;
  maxMembers: number;
  minMembers: number;
  staffRequired: number;
  parentId: number | null;
  status: ActivityStatus;
  categoryIds?: number[];
  disciplineIds?: number[];
}
