"use client";

import { Button } from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";

interface AssignmentModalProps {
  teamSeasonId: string;
  onAssignmentSuccess?: () => void;
}

export const AssignmentModal = ({
  teamSeasonId,
  onAssignmentSuccess,
}: AssignmentModalProps) => {
  return (
    <Button
      color="primary"
      size="md"
      className="font-semibold"
      startContent={<HugeiconsIcon icon={UserAdd01Icon} size={18} />}
    >
      Asignar Membresía
    </Button>
  );
};
