"use client";

import { Modal, Button, Input, Autocomplete, Spinner } from "@heroui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAddIcon, Send01Icon } from "@hugeicons/core-free-icons";
import { ITeamSeason } from "@/modules/team-seasons";
import { IPaymentPlan } from "@/modules/payment-plans";
import { IMember } from "@/modules/membresias/types";
import { assignMemberToTeamSeason } from "@/modules/membresias/actions";
import { InvoicePreview } from "./InvoicePreview";
import { toast } from "@/utils/toast";

interface AssignmentModalProps {
  teamSeason: ITeamSeason;
  members: IMember[];
  paymentPlans: IPaymentPlan[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAssignmentSuccess?: () => void;
}

export const AssignmentModal = ({
  teamSeason,
  members,
  paymentPlans,
  isOpen,
  onOpenChange,
  onAssignmentSuccess,
}: AssignmentModalProps) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedMember = members.find((m) => m.id === selectedMemberId);
  const selectedPlan = paymentPlans.find((p) => p.id === selectedPlanId);

  const estimatedAssignment = selectedMember && selectedPlan && teamSeason
    ? {
        id: "estimate",
        memberId: selectedMember.id,
        member: selectedMember,
        teamSeasonId: teamSeason.id,
        teamSeason,
        paymentPlanId: selectedPlan.id,
        paymentPlan: selectedPlan,
        registrationFeeAmount: parseFloat(selectedPlan.registrationDiscountPercent) * (teamSeason.registrationFee || 0),
        monthlyFeeAmount: parseFloat(selectedPlan.monthlyDiscountPercent) * (teamSeason.monthlyFee || 0),
        totalInitialCharges:
          parseFloat(selectedPlan.registrationDiscountPercent) * (teamSeason.registrationFee || 0) +
          parseFloat(selectedPlan.monthlyDiscountPercent) * (teamSeason.monthlyFee || 0),
        status: "active" as const,
        enrolledAt: new Date(),
      }
    : null;

  const handleAssign = async () => {
    if (!selectedMemberId || !selectedPlanId) {
      toast.warning("Selecciona un miembro y un plan de pago");
      return;
    }

    try {
      setIsLoading(true);

      const result = await assignMemberToTeamSeason({
        memberId: selectedMemberId,
        teamSeasonId: teamSeason.id,
        paymentPlanId: selectedPlanId,
      });

      if (result.error) {
        toast.error(result.message || "Error al asignar miembro");
      } else {
        toast.success(result.message);
        onAssignmentSuccess?.();
        onOpenChange(false);
        setSelectedMemberId("");
        setSelectedPlanId("");
      }
    } catch (error) {
      toast.error("Error al asignar miembro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      size="2xl"
      classNames={{
        backdrop: "bg-overlay/80 backdrop-blur-md",
      }}
    >
      <Modal.Content>
        {(onClose) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Modal.Header className="flex items-center gap-2">
              <HugeiconsIcon icon={UserAddIcon} size={20} />
              <span>Asignar Miembro a Temporada</span>
            </Modal.Header>
            <Modal.Body className="gap-6">
              <div className="space-y-4">
                <Autocomplete
                  label="Selecciona un miembro"
                  placeholder="Buscar por nombre..."
                  selectedKey={selectedMemberId}
                  onSelectionChange={(key) => setSelectedMemberId(String(key || ""))}
                  defaultItems={members.map((m) => ({
                    key: m.id,
                    label: `${m.person?.name || ""} ${m.person?.lastName || ""}`,
                    value: m.id,
                    description: m.person?.email,
                  }))}
                  isDisabled={isLoading}
                  isClearable
                />

                <Autocomplete
                  label="Selecciona un plan de pago"
                  placeholder="Buscar por nombre..."
                  selectedKey={selectedPlanId}
                  onSelectionChange={(key) => setSelectedPlanId(String(key || ""))}
                  defaultItems={paymentPlans.map((p) => ({
                    key: p.id,
                    label: p.name,
                    value: p.id,
                  }))}
                  isDisabled={isLoading}
                  isClearable
                />
              </div>

              {estimatedAssignment && (
                <div>
                  <InvoicePreview assignment={estimatedAssignment} isLoading={isLoading} />
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                color="default"
                variant="light"
                onPress={onClose}
                isDisabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                onPress={handleAssign}
                isDisabled={!selectedMemberId || !selectedPlanId || isLoading}
                isLoading={isLoading}
                startContent={!isLoading && <HugeiconsIcon icon={Send01Icon} size={18} />}
              >
                {isLoading ? "Procesando..." : "Asignar"}
              </Button>
            </Modal.Footer>
          </motion.div>
        )}
      </Modal.Content>
    </Modal>
  );
};
