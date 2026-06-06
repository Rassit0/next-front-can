"use client";
import { Avatar, Button, Checkbox, Chip, Table } from "@heroui/react";
import {
  ChevronUp,
  Copy01Icon,
  Delete01Icon,
  Edit03Icon,
  EyeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ButtonGestion } from "./ButtonGestion";
import { EditModal } from "../modal/EditModal";
import { ICategory } from "../../interfaces/category.interface";
import { SortableColumnHeader } from "@/ui";
import { DeleteModal } from "../modal/DeleteModal";

interface Props {
  categories: ICategory[];
}

export const TableCategories = ({ categories }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: string;
    direction: "ascending" | "descending";
  }>({
    column: "id",
    direction: "ascending",
  });

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
          //   selectedKeys={selectedKeys}
          //   selectionMode="multiple"
          //   onSelectionChange={setSelectedKeys}
          onSortChange={(sd) =>
            setSortDescriptor({
              column: sd.column.toString(),
              direction: sd.direction,
            })
          }
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
              <SortableColumnHeader id="name">CATEGORÍA</SortableColumnHeader>
            </Table.Column>

            <Table.Column allowsSorting id="description">
              <SortableColumnHeader id="description">
                DESCRIPCIÓN
              </SortableColumnHeader>
            </Table.Column>

            <Table.Column allowsSorting id="minAge">
              <SortableColumnHeader id="minAge">EDAD MIN.</SortableColumnHeader>
            </Table.Column>

            <Table.Column allowsSorting id="maxAge">
              <SortableColumnHeader id="maxAge">EDAD MAX.</SortableColumnHeader>
            </Table.Column>

            <Table.Column allowsSorting id="status">
              <SortableColumnHeader id="status">ESTADO</SortableColumnHeader>
            </Table.Column>

            <Table.Column className="text-center">ACCIONES</Table.Column>
          </Table.Header>
          <Table.Body>
            {categories.map((category) => (
              <Table.Row key={category.id} id={category.id}>
                <Table.Cell>#{category.id}</Table.Cell>
                <Table.Cell>{category.name}</Table.Cell>
                <Table.Cell>{category.description || "-"}</Table.Cell>
                <Table.Cell>{category.minAge}</Table.Cell>
                <Table.Cell>{category.maxAge}</Table.Cell>
                <Table.Cell>
                  <Chip
                    color={
                      statusColorMap[category.isActive ? "Active" : "Inactive"]
                    }
                    size="sm"
                    variant="soft"
                  >
                    {category.isActive ? "Activo" : "Inactivo"}
                  </Chip>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center justify-center gap-1">
                    <ButtonGestion id={category.id} />
                    <Button isIconOnly size="sm" variant="tertiary">
                      <HugeiconsIcon icon={EyeIcon} />
                    </Button>
                    <EditModal category={category} isIcon={true} />
                    <DeleteModal category={category} isIcon={true} />
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
