import {
  CheckCircle2Icon,
  AlertCircleIcon,
  ClockIcon,
  XCircleIcon,
  CancelIcon,
} from "@hugeicons/core-free-icons";

export const PAYMENT_STATUS_CONFIG = {
  pending: {
    label: "Pendiente",
    icon: ClockIcon,
    color: "warning",
    bgColor: "bg-warning/10",
    textColor: "text-warning",
  },
  processing: {
    label: "Procesando",
    icon: AlertCircleIcon,
    color: "accent",
    bgColor: "bg-accent/10",
    textColor: "text-accent",
  },
  completed: {
    label: "Completado",
    icon: CheckCircle2Icon,
    color: "success",
    bgColor: "bg-success/10",
    textColor: "text-success",
  },
  failed: {
    label: "Fallido",
    icon: XCircleIcon,
    color: "danger",
    bgColor: "bg-danger/10",
    textColor: "text-danger",
  },
  cancelled: {
    label: "Cancelado",
    icon: CancelIcon,
    color: "default",
    bgColor: "bg-default/10",
    textColor: "text-default-foreground",
  },
} as const;

export const PAYMENT_METHOD_CONFIG = {
  "credit-card": {
    label: "Tarjeta de Crédito",
    icon: "💳",
  },
  "debit-card": {
    label: "Tarjeta de Débito",
    icon: "💳",
  },
  "bank-transfer": {
    label: "Transferencia Bancaria",
    icon: "🏦",
  },
  cash: {
    label: "Efectivo",
    icon: "💵",
  },
} as const;
