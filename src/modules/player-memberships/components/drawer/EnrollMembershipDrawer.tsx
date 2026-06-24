"use client";
import {
  Button,
  ComboBox,
  Drawer,
  Input,
  Label,
  ListBox,
  Surface,
  TextField,
  toast,
  useOverlayState,
} from "@heroui/react";
import { Add01Icon, UserAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ITeamSeason } from "@/modules/team-seasons";
import { IPaymentPlan } from "@/modules/payment-plans";
import { IPlayer } from "@/modules/players";
import { addPlayerMembership } from "@/modules/player-memberships";
import { calculateInitialCharges } from "@/modules/player-memberships/helpers/initial-charges";
import { InvoicePreview } from "@/modules/player-memberships/components/invoice/InvoicePreview";

interface Props {
  teamSeason: ITeamSeason;
  paymentPlans: IPaymentPlan[];
  players: IPlayer[];
  size?: "lg" | "md" | "sm";
}

const fullName = (player: IPlayer) =>
  [player.person.name, player.person.lastName, player.person.secondLastName]
    .filter(Boolean)
    .join(" ");

const today = () => new Date().toISOString().slice(0, 10);

export const EnrollMembershipDrawer = ({
  teamSeason,
  paymentPlans,
  players,
  size = "md",
}: Props) => {
  const state = useOverlayState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [playerKey, setPlayerKey] = useState<string | null>(null);
  const [planKey, setPlanKey] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState<string>(today());

  const selectedPlayer = players.find((p) => p.id === playerKey) ?? null;
  const selectedPlan = paymentPlans.find((p) => p.id === planKey) ?? null;

  const breakdown = useMemo(() => {
    if (!planKey && paymentPlans.length > 0 && !selectedPlan) return null;
    return calculateInitialCharges(teamSeason, selectedPlan);
  }, [teamSeason, selectedPlan, planKey, paymentPlans.length]);

  const reset = () => {
    setPlayerKey(null);
    setPlanKey(null);
    setStartedAt(today());
  };

  const handleSubmit = async () => {
    if (!playerKey || !planKey || !startedAt) {
      toast.danger("Datos incompletos", {
        description: "Selecciona el atleta, el plan de pago y la fecha de inicio.",
      });
      return;
    }
    setLoading(true);
    const res = await addPlayerMembership({
      playerId: playerKey,
      teamSeasonId: teamSeason.id,
      paymentPlanId: planKey,
      startedAt: new Date(startedAt).toISOString(),
    });
    setLoading(false);

    if (res.error) {
      toast.danger(res.message, {
        description: res.errors
          ? Object.values(res.errors).flat().join(", ")
          : res.message,
      });
      return;
    }
    toast.success(res.message, {
      description: selectedPlayer
        ? `${fullName(selectedPlayer)} fue inscrito en la temporada.`
        : undefined,
    });
    reset();
    state.close();
    router.refresh();
  };

  const noPlans = paymentPlans.length === 0;
  const noPlayers = players.length === 0;

  return (
    <>
      <Button
        size={size}
        className="w-full bg-pink-500 text-white font-extrabold text-md pulse-pink shadow-lg shadow-pink-500/20 hover:scale-[1.02] hover:cursor-pointer active:scale-95 transition-all"
        onPress={() => state.open()}
      >
        <HugeiconsIcon icon={UserAdd01Icon} size={18} />
        Inscribir Atleta
      </Button>

      <Drawer.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen}>
        <Drawer.Content placement="right">
          <Drawer.Dialog className="w-full sm:max-w-md">
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Inscribir atleta</Drawer.Heading>
              <p className="mt-1 text-sm text-muted">
                {teamSeason.team.name} · {teamSeason.season.name}
              </p>
            </Drawer.Header>

            <Drawer.Body>
              <Surface variant="transparent" className="flex flex-col gap-4">
                {/* Player picker */}
                <ComboBox
                  className="w-full"
                  variant="secondary"
                  menuTrigger="focus"
                  selectedKey={playerKey}
                  onSelectionChange={(key) =>
                    setPlayerKey(key ? String(key) : null)
                  }
                  isDisabled={noPlayers}
                >
                  <Label>Atleta</Label>
                  <ComboBox.InputGroup>
                    <Input
                      variant="secondary"
                      placeholder={
                        noPlayers
                          ? "No hay atletas registrados"
                          : "Busca un atleta por nombre"
                      }
                    />
                    <ComboBox.Trigger />
                  </ComboBox.InputGroup>
                  <ComboBox.Popover>
                    <ListBox>
                      {players.map((player) => (
                        <ListBox.Item
                          key={player.id}
                          id={player.id}
                          textValue={fullName(player)}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {fullName(player)}
                            </span>
                            <span className="text-[11px] text-muted">
                              {player.person.documentType}{" "}
                              {player.person.documentNumber}
                            </span>
                          </div>
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </ComboBox.Popover>
                </ComboBox>

                {/* Payment plan picker */}
                <ComboBox
                  className="w-full"
                  variant="secondary"
                  menuTrigger="focus"
                  selectedKey={planKey}
                  onSelectionChange={(key) =>
                    setPlanKey(key ? String(key) : null)
                  }
                  isDisabled={noPlans}
                >
                  <Label>Plan de pago</Label>
                  <ComboBox.InputGroup>
                    <Input
                      variant="secondary"
                      placeholder={
                        noPlans
                          ? "Crea un plan de pago primero"
                          : "Selecciona un plan de pago"
                      }
                    />
                    <ComboBox.Trigger />
                  </ComboBox.InputGroup>
                  <ComboBox.Popover>
                    <ListBox>
                      {paymentPlans.map((plan) => (
                        <ListBox.Item
                          key={plan.id}
                          id={plan.id}
                          textValue={plan.name}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{plan.name}</span>
                            <span className="text-[11px] text-muted">
                              Insc. -{plan.registrationDiscountPercent}% · Mens.
                              -{plan.monthlyDiscountPercent}%
                            </span>
                          </div>
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </ComboBox.Popover>
                </ComboBox>

                {/* Start date */}
                <TextField className="w-full" name="startedAt">
                  <Label>Fecha de inicio</Label>
                  <Input
                    variant="secondary"
                    type="date"
                    value={startedAt}
                    onChange={(e) => setStartedAt(e.target.value)}
                  />
                </TextField>

                {/* Live invoice preview */}
                <InvoicePreview
                  breakdown={breakdown}
                  planName={selectedPlan?.name}
                  playerName={selectedPlayer ? fullName(selectedPlayer) : null}
                />
              </Surface>
            </Drawer.Body>

            <Drawer.Footer>
              <Button
                slot="close"
                variant="secondary"
                isDisabled={loading}
                onPress={() => reset()}
              >
                Cancelar
              </Button>
              <Button
                onPress={handleSubmit}
                isPending={loading}
                isDisabled={loading || noPlans || noPlayers}
              >
                <HugeiconsIcon icon={Add01Icon} size={18} />
                Confirmar inscripción
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </>
  );
};
