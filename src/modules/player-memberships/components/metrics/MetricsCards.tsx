"use client";
import { Card, ProgressBar } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserGroupIcon,
  CheckmarkBadge01Icon,
  PauseIcon,
  Coins01Icon,
} from "@hugeicons/core-free-icons";
import { motion } from "framer-motion";
import { ITeamSeason } from "@/modules/team-seasons";
import { IPlayerMembership } from "@/modules/player-memberships";
import {
  calculateInitialCharges,
  formatCurrency,
} from "@/modules/player-memberships/helpers/initial-charges";

interface Props {
  memberships: IPlayerMembership[];
  teamSeason: ITeamSeason;
  totalItems: number;
}

export const MetricsCards = ({
  memberships,
  teamSeason,
  totalItems,
}: Props) => {
  const active = memberships.filter((m) => m.status === "ACTIVE");
  const suspended = memberships.filter((m) => m.status === "SUSPENDED");

  const estimatedRevenue = active.reduce(
    (acc, m) =>
      acc + calculateInitialCharges(teamSeason, m.paymentPlan).total,
    0,
  );

  const occupancy =
    teamSeason.maxMembers > 0
      ? Math.min(100, Math.round((totalItems / teamSeason.maxMembers) * 100))
      : 0;

  const cards = [
    {
      label: "Atletas inscritos",
      value: String(totalItems),
      hint: `${teamSeason.maxMembers} cupos · mín. ${teamSeason.minMembers}`,
      icon: UserGroupIcon,
      tone: "text-accent",
      bg: "bg-accent-soft",
      progress: occupancy,
    },
    {
      label: "Membresías activas",
      value: String(active.length),
      hint: "En curso esta temporada",
      icon: CheckmarkBadge01Icon,
      tone: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Suspendidas",
      value: String(suspended.length),
      hint: "Requieren seguimiento",
      icon: PauseIcon,
      tone: "text-warning",
      bg: "bg-warning/10",
    },
    {
      label: "Recaudación inicial est.",
      value: formatCurrency(estimatedRevenue, "Bs"),
      hint: "Cargos iniciales activos",
      icon: Coins01Icon,
      tone: "text-accent",
      bg: "bg-accent-soft",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.07 }}
        >
          <Card className="card-hover h-full p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-muted">{card.label}</p>
                <p className="mt-1 text-2xl font-extrabold tracking-tight text-foreground">
                  {card.value}
                </p>
              </div>
              <span
                className={`flex size-10 items-center justify-center rounded-xl ${card.bg} ${card.tone}`}
              >
                <HugeiconsIcon icon={card.icon} size={20} />
              </span>
            </div>
            {typeof card.progress === "number" ? (
              <div className="mt-3">
                <ProgressBar value={card.progress} className="w-full">
                  <ProgressBar.Track>
                    <ProgressBar.Fill />
                  </ProgressBar.Track>
                </ProgressBar>
                <p className="mt-1 text-[11px] text-muted">
                  {card.progress}% de ocupación
                </p>
              </div>
            ) : (
              <p className="mt-3 text-[11px] text-muted">{card.hint}</p>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
