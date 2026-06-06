"use client";
import { Avatar, Button, Checkbox, Chip, Table } from "@heroui/react";
import { EyeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { ButtonGestion } from "./ButtonGestion";
import { EditModal } from "../modal/EditModal";
import { SortableColumnHeader } from "@/ui";
import { DeleteModal } from "../modal/DeleteModal";
import { IClub } from "../../interfaces/club.interface";
import { IDisciplineOptions } from "../../interfaces/options.club.interface";
import { iconMap } from "@/utils";

interface Props {
  clubs: IClub[];
  disciplinesOptions: IDisciplineOptions[];
}

export const TableClubs = ({ clubs, disciplinesOptions }: Props) => {
  const [isClient, setIsClient] = useState(false);

  // Evitamos la hidratación fallida
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // O un esqueleto de carga (Skeleton)
  }

  const statusColorMap: Record<string, "success" | "danger"> = {
    Active: "success",
    Inactive: "danger",
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
              ID
            </Table.Column>

            <Table.Column allowsSorting id="name">
              <SortableColumnHeader id="name">CLUB</SortableColumnHeader>
            </Table.Column>

            <Table.Column allowsSorting id="discipline">
              DISCIPLINA
            </Table.Column>

            <Table.Column className="text-center">ACCIONES</Table.Column>
          </Table.Header>
          <Table.Body>
            {clubs.map((club) => (
              <Table.Row key={club.id} id={club.id}>
                <Table.Cell>{club.id}</Table.Cell>
                <Table.Cell>{club.name}</Table.Cell>
                <Table.Cell>
                  <Chip variant="primary" color="default">
                    <div className="flex items-center gap-1">
                      <HugeiconsIcon
                        icon={iconMap[club.discipline.icon]}
                        size={16}
                      />
                      {club.discipline.name}
                    </div>
                  </Chip>
                </Table.Cell>

                <Table.Cell>
                  <div className="flex items-center justify-center gap-1">
                    <ButtonGestion id={club.id} />
                    <Button isIconOnly size="sm" variant="tertiary">
                      <HugeiconsIcon icon={EyeIcon} />
                    </Button>
                    <EditModal
                      club={club}
                      disciplinesOptions={disciplinesOptions}
                      isIcon={true}
                    />
                    <DeleteModal club={club} isIcon={true} />
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
