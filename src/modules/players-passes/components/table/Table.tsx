"use client";
import { Avatar, Button, Chip, Table } from "@heroui/react";
import { Copy01Icon, Delete01Icon, EyeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ButtonManage } from "@/modules/players";
import { SortableColumnHeader } from "@/ui";
import { ButtonManagePasses } from "./ButtonManagePasses";
import {
  IPlayerPass,
  PlayerPassOriginType,
  PlayerPassStatus,
} from "@/modules/players-passes";

interface Props {
  playerPasses: IPlayerPass[];
}

export const TablePlayerPasses = ({ playerPasses }: Props) => {
  const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
    Active: "success",
    Inactive: "danger",
    "On Leave": "warning",
  };

  const originTypeMap: Record<PlayerPassOriginType, string> = {
    INTERNAL: "Interno",
    EXTERNAL: "Externo",
    FREE_AGENT: "Agente Libre",
  };

  const originTypeClassMap: Record<PlayerPassOriginType, string> = {
    INTERNAL: "bg-accent text-accent-soft",
    EXTERNAL: "bg-default text-default-soft",
    FREE_AGENT: "bg-success text-success-soft",
  };

  const playerPassStatusMap: Record<PlayerPassStatus, string> = {
    ACTIVE: "Activo",
    INACTIVE: "Anterior",
    PENDING: "Pendiente",
    REJECTED: "Rechazado",
  };

  const playerPassStatusClassMap: Record<PlayerPassStatus, string> = {
    ACTIVE: "bg-success text-success-soft",
    INACTIVE: "bg-default text-default-soft",
    PENDING: "bg-warning text-warning-soft",
    REJECTED: "bg-danger text-danger-soft",
  };

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Table with custom cells"
          className="min-w-200"
        >
          <Table.Header>
            {/* <Table.Column
              allowsSorting
              isRowHeader
              className="after:hidden"
              id="id"
            >
              <SortableColumnHeader id="id">ID</SortableColumnHeader>
            </Table.Column> */}

            <Table.Column isRowHeader allowsSorting id="player">
              <SortableColumnHeader id="player">JUGADOR</SortableColumnHeader>
            </Table.Column>

            <Table.Column allowsSorting id="previousTeam">
              ORIGEN
            </Table.Column>

            <Table.Column allowsSorting id="currentTeam">
              DESTINO
            </Table.Column>

            <Table.Column allowsSorting id="originType">
              TIPO DE ORIGEN
            </Table.Column>

            <Table.Column allowsSorting id="startDate">
              <SortableColumnHeader id="startDate">
                FECHA INICIO
              </SortableColumnHeader>
            </Table.Column>

            <Table.Column allowsSorting id="endDate">
              <SortableColumnHeader id="endDate">
                FECHA FIN
              </SortableColumnHeader>
            </Table.Column>

            <Table.Column allowsSorting id="status">
              <SortableColumnHeader id="status">ESTADO</SortableColumnHeader>
            </Table.Column>

            <Table.Column className="text-center">ACCIONES</Table.Column>
          </Table.Header>
          <Table.Body>
            {playerPasses.map((playerPass) => {
              return (
                <Table.Row key={playerPass.id} id={playerPass.id}>
                  {/* <Table.Cell className="font-medium">
              <div className="flex items-center gap-2">
                {player.id.toString()}{" "}
                <Button isIconOnly size="sm" variant="ghost">
                  <HugeiconsIcon icon={Copy01Icon} />
                </Button>
              </div>
            </Table.Cell> */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <Avatar.Image
                          src={playerPass.player.person.imageUrl || undefined}
                        />
                        <Avatar.Fallback>
                          {(
                            playerPass.player.person.name +
                            " " +
                            playerPass.player.person.lastName +
                            (playerPass.player.person.secondLastName
                              ? " " + playerPass.player.person.secondLastName
                              : "")
                          )
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-xs">
                          {playerPass.player.person.name +
                            " " +
                            playerPass.player.person.lastName +
                            (playerPass.player.person.secondLastName
                              ? " " + playerPass.player.person.secondLastName
                              : "")}
                        </span>
                        <span className="text-xs text-muted">
                          {playerPass.player.person.email}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>
                  {/* Origen */}
                  <Table.Cell>
                    {playerPass.previousTeam?.name ||
                      playerPass.externalPreviousTeamName ||
                      "-"}
                  </Table.Cell>
                  {/* Destino */}
                  <Table.Cell>{playerPass.currentTeam.name}</Table.Cell>
                  {/* Tipo de Origne */}
                  <Table.Cell className="min-w-25">
                    <Chip
                      size="sm"
                      variant="soft"
                      className={originTypeClassMap[playerPass.originType]}
                    >
                      {originTypeMap[playerPass.originType]}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    {playerPass.startDate?.toLocaleDateString() || "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {playerPass.endDate?.toLocaleDateString() || "-"}
                  </Table.Cell>
                  <Table.Cell className="min-w-25">
                    <Chip
                      size="sm"
                      variant="soft"
                      className={playerPassStatusClassMap[playerPass.status]}
                    >
                      {playerPassStatusMap[playerPass.status]}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    s
                    {/* <div className="flex items-center justify-center gap-1">
              <ButtonManagePasses id={player.id} />
              <ButtonManage id={player.id} />
              <Button isIconOnly size="sm" variant="tertiary">
                <HugeiconsIcon icon={EyeIcon} />
              </Button>
              <EditModal player={player} isIcon={true} />
              <Button isIconOnly size="sm" variant="danger-soft">
                <HugeiconsIcon icon={Delete01Icon} />
              </Button>
            </div> */}
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
