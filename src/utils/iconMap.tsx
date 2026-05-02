// frontend/src/utils/iconMap.tsx
import {
  VolleyballIcon,
  BasketballIcon,
  FootballIcon, // Útil para Futsal
  BookOpenIcon, // Útil para Cursos/Educación
  ActivityIcon, // El genérico por defecto
  TennisBallIcon,
  TennisRacketIcon,
  TableTennisBatIcon,
  Chess01Icon,
} from "@hugeicons/core-free-icons";

type IconSvgObject =
  | [
      string,
      {
        [key: string]: string | number;
      },
    ][]
  | readonly (readonly [
      string,
      {
        readonly [key: string]: string | number;
      },
    ])[];
export const iconMap: Record<string, IconSvgObject> = {
  volleyball: VolleyballIcon,
  basketball: BasketballIcon,
  futsal: FootballIcon,
  racket: TennisRacketIcon,
  tennis: TennisBallIcon,
  pingpong: TableTennisBatIcon,
  chess: Chess01Icon,
  academic: BookOpenIcon,
  default: ActivityIcon,
};
