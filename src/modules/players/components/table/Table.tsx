"use client";
import { Avatar, Button, Chip, Table } from "@heroui/react";
import { Copy01Icon, Delete01Icon, EyeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ButtonManage } from "@/modules/players";
import { SortableColumnHeader } from "@/ui";
import { Gender, IPlayer } from "@/modules/players";
import { ButtonManagePasses } from "./ButtonManagePasses";

interface Props {
  players: IPlayer[];
}

export const TablePlayers = ({ players }: Props) => {
  const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
    Active: "success",
    Inactive: "danger",
    "On Leave": "warning",
  };

  const genderMap: Record<Gender, string> = {
    MALE: "Masculino",
    FEMALE: "Femenino",
  };

  const genderClassMap: Record<Gender, string> = {
    MALE: "bg-blue-400 text-blue-50",
    FEMALE: "bg-pink-400 text-pink-50",
  };

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Table with custom cells"
          className="min-w-200"
        >
          <Table.Header>
            <Table.Column
              allowsSorting
              isRowHeader
              className="after:hidden"
              id="id"
            >
              <SortableColumnHeader id="id">ID</SortableColumnHeader>
            </Table.Column>

            <Table.Column allowsSorting id="name">
              <SortableColumnHeader id="name">JUGADOR</SortableColumnHeader>
            </Table.Column>

            <Table.Column allowsSorting id="documentNumber">
              <SortableColumnHeader id="documentNumber">
                CI
              </SortableColumnHeader>
            </Table.Column>

            <Table.Column allowsSorting id="birthDate">
              <SortableColumnHeader id="birthDate">
                FECHA NACIMIENTO
              </SortableColumnHeader>
            </Table.Column>

            <Table.Column allowsSorting id="phone">
              <SortableColumnHeader id="phone">TELÉFONO</SortableColumnHeader>
            </Table.Column>

            <Table.Column allowsSorting id="gender">
              <SortableColumnHeader id="gender">GENERO</SortableColumnHeader>
            </Table.Column>

            <Table.Column className="text-center">ACCIONES</Table.Column>
          </Table.Header>
          <Table.Body>
            {players.map((player) => (
              <Table.Row key={player.id} id={player.id}>
                <Table.Cell className="font-medium">
                  <div className="flex items-center gap-2">
                    {player.id.toString()}{" "}
                    <Button isIconOnly size="sm" variant="ghost">
                      <HugeiconsIcon icon={Copy01Icon} />
                    </Button>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <Avatar.Image src={player.person.imageUrl || undefined} />
                      <Avatar.Fallback>
                        {(
                          player.person.name +
                          " " +
                          player.person.lastName +
                          (player.person.secondLastName
                            ? " " + player.person.secondLastName
                            : "")
                        )
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs">
                        {player.person.name +
                          " " +
                          player.person.lastName +
                          (player.person.secondLastName
                            ? " " + player.person.secondLastName
                            : "")}
                      </span>
                      <span className="text-xs text-muted">
                        {player.person.email}
                      </span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>{player.person.documentNumber}</Table.Cell>
                <Table.Cell>
                  {player.person.birthDate?.toLocaleDateString() || "-"}
                </Table.Cell>
                <Table.Cell>{player.person.phone || "-"}</Table.Cell>
                <Table.Cell className="min-w-25">
                  <Chip
                    size="sm"
                    variant="soft"
                    className={genderClassMap[player.person.gender]}
                  >
                    {genderMap[player.person.gender]}
                  </Chip>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center justify-center gap-1">
                    <ButtonManagePasses id={player.id} />
                    <ButtonManage id={player.id} />
                    <Button isIconOnly size="sm" variant="tertiary">
                      <HugeiconsIcon icon={EyeIcon} />
                    </Button>
                    {/* <EditModal player={player} isIcon={true} /> */}
                    <Button isIconOnly size="sm" variant="danger-soft">
                      <HugeiconsIcon icon={Delete01Icon} />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};
