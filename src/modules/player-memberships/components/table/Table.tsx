"use client";
import { Avatar, Table } from "@heroui/react";
import { useEffect, useState } from "react";
import { SortableColumnHeader } from "@/ui";
import { ITeamSeason } from "@/modules/team-seasons";
import { IPlayerMembership } from "@/modules/player-memberships";
import { StatusChip } from "@/modules/player-memberships/components/status/StatusChip";
import { MembershipActions } from "@/modules/player-memberships/components/actions/MembershipActions";
import {
  calculateInitialCharges,
  formatCurrency,
} from "@/modules/player-memberships/helpers/initial-charges";

interface Props {
  memberships: IPlayerMembership[];
  teamSeason: ITeamSeason;
}

const initials = (name: string, lastName: string) =>
  `${name?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

export const TableMemberships = ({ memberships, teamSeason }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Membresías de atletas" className="min-w-200">
          <Table.Header>
            <Table.Column isRowHeader allowsSorting id="player">
              <SortableColumnHeader id="player">ATLETA</SortableColumnHeader>
            </Table.Column>
            <Table.Column allowsSorting id="paymentPlan">
              <SortableColumnHeader id="paymentPlan">
                PLAN DE PAGO
              </SortableColumnHeader>
            </Table.Column>
            <Table.Column id="initialCharges" className="text-right">
              CARGOS INICIALES
            </Table.Column>
            <Table.Column allowsSorting id="startedAt">
              <SortableColumnHeader id="startedAt">INICIO</SortableColumnHeader>
            </Table.Column>
            <Table.Column allowsSorting id="status">
              <SortableColumnHeader id="status">ESTADO</SortableColumnHeader>
            </Table.Column>
            <Table.Column className="text-center">ACCIONES</Table.Column>
          </Table.Header>
          <Table.Body
            renderEmptyState={() => (
              <div className="py-10 text-center text-sm text-muted">
                Aún no hay atletas inscritos en esta temporada.
              </div>
            )}
          >
            {memberships.map((membership) => {
              const person = membership.player?.person;
              const charges = calculateInitialCharges(
                teamSeason,
                membership.paymentPlan,
              );
              return (
                <Table.Row key={membership.id} id={membership.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <Avatar.Image
                          alt={person?.name ?? "Atleta"}
                          src={person?.imageUrl ?? undefined}
                          loading="lazy"
                        />
                        <Avatar.Fallback>
                          {person
                            ? initials(person.name, person.lastName)
                            : "AT"}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                          {person
                            ? `${person.name} ${person.lastName}`
                            : "Atleta"}
                        </span>
                        {person ? (
                          <span className="text-[11px] text-muted">
                            {person.documentType} {person.documentNumber}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {membership.paymentPlan?.name ?? "—"}
                  </Table.Cell>
                  <Table.Cell className="text-right font-semibold tabular-nums">
                    {formatCurrency(charges.total, charges.currency)}
                  </Table.Cell>
                  <Table.Cell>
                    {membership.startedAt.toLocaleDateString("es-BO")}
                  </Table.Cell>
                  <Table.Cell>
                    <StatusChip status={membership.status} />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center justify-center">
                      <MembershipActions membership={membership} />
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};
