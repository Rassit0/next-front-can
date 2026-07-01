"use client";

import { Button, Dropdown, Spinner } from "@heroui/react";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalIcon, PauseCircleIcon, CheckCircleIcon, LogOutIcon, PlayCircleIcon } from "@hugeicons/core-free-icons";
import { IMemberTeamSeasonAssignment } from "@/modules/membresias/types";
import {
  suspendMemberAssignment,
  reactivateMemberAssignment,
  completeMemberAssignment,
  withdrawMemberAssignment,
} from "@/modules/membresias/actions";
import { toast } from "@/utils/toast";

interface AssignmentActionsProps {
  assignment: IMemberTeamSeasonAssignment;
  onStatusChange?: () => void;
}

export const AssignmentActions = ({
  assignment,
  onStatusChange,
}: AssignmentActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: string) => {
    try {
      setIsLoading(true);

      let result;
      switch (action) {
        case "suspend":
          result = await suspendMemberAssignment(assignment.id);
          break;
        case "reactivate":
          result = await reactivateMemberAssignment(assignment.id);
          break;
        case "complete":
          result = await completeMemberAssignment(assignment.id);
          break;
        case "withdraw":
          result = await withdrawMemberAssignment(assignment.id);
          break;
        default:
          return;
      }

      if (result.error) {
        toast.error(result.message || "Error al procesar la acción");
      } else {
        toast.success(result.message);
        onStatusChange?.();
      }
    } catch (error) {
      toast.error("Error al procesar la acción");
    } finally {
      setIsLoading(false);
    }
  };

  const actions = [
    {
      key: "suspend",
      label: "Suspender",
      icon: PauseCircleIcon,
      color: "warning" as const,
      visible: assignment.status === "active",
    },
    {
      key: "reactivate",
      label: "Reactivar",
      icon: PlayCircleIcon,
      color: "success" as const,
      visible: assignment.status === "suspended",
    },
    {
      key: "complete",
      label: "Completar",
      icon: CheckCircleIcon,
      color: "default" as const,
      visible: assignment.status === "active",
    },
    {
      key: "withdraw",
      label: "Retirar",
      icon: LogOutIcon,
      color: "danger" as const,
      visible: assignment.status === "active" || assignment.status === "suspended",
    },
  ];

  const availableActions = actions.filter((a) => a.visible);

  if (availableActions.length === 0) {
    return (
      <Button
        isIconOnly
        variant="light"
        size="sm"
        disabled
        className="text-muted"
      >
        —
      </Button>
    );
  }

  return (
    <Dropdown>
      <Button
        isIconOnly
        variant="light"
        size="sm"
        isDisabled={isLoading}
        className="data-[hover=true]:bg-default/40"
      >
        {isLoading ? (
          <Spinner size="sm" color="current" />
        ) : (
          <HugeiconsIcon icon={MoreVerticalIcon} size={18} />
        )}
      </Button>
      <Dropdown.Menu
        aria-label="Acciones de asignación"
        disabledKeys={isLoading ? availableActions.map((a) => a.key) : []}
      >
        {availableActions.map((action) => (
          <Dropdown.Item
            key={action.key}
            className={`text-${action.color}`}
            startContent={
              <HugeiconsIcon icon={action.icon} size={16} />
            }
            onPress={() => handleAction(action.key)}
          >
            {action.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
