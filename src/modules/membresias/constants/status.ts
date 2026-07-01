import { CheckCircle2Icon, AlertCircleIcon, PauseCircleIcon, LogOutIcon } from "@hugeicons/core-free-icons";

export const ASSIGNMENT_STATUS_CONFIG = {
  active: {
    label: "Activo",
    icon: CheckCircle2Icon,
    color: "success",
    bgColor: "bg-success/10",
    textColor: "text-success",
  },
  suspended: {
    label: "Suspendido",
    icon: PauseCircleIcon,
    color: "warning",
    bgColor: "bg-warning/10",
    textColor: "text-warning",
  },
  completed: {
    label: "Completado",
    icon: CheckCircle2Icon,
    color: "default",
    bgColor: "bg-default/10",
    textColor: "text-default-foreground",
  },
  withdrawn: {
    label: "Retirado",
    icon: LogOutIcon,
    color: "danger",
    bgColor: "bg-danger/10",
    textColor: "text-danger",
  },
} as const;

export const ASSIGNMENT_STATUS_ACTIONS: Record<string, string[]> = {
  active: ["suspend", "complete", "withdraw"],
  suspended: ["reactivate", "withdraw"],
  completed: [],
  withdrawn: [],
};
