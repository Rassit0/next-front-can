import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";
import { ChevronUp } from "@hugeicons/core-free-icons";

interface Props {
  children: React.ReactNode;
  id: string;
  sortDescriptor: {
    column: string;
    direction: "ascending" | "descending";
  };
}

export const SortableColumnHeader = ({
  children,
  id,
  sortDescriptor,
}: Props) => {
  // Calculamos la dirección si esta columna es la que está activa
  const isSorted = sortDescriptor.column === id;
  const sortDirection = isSorted ? sortDescriptor.direction : undefined;

  return (
    <span className="flex items-center justify-between">
      {children}
      {isSorted && (
        <HugeiconsIcon
          icon={ChevronUp}
          className={clsx(
            "size-3 transform transition-transform duration-100 ease-out",
            sortDirection === "descending" ? "rotate-180" : "",
          )}
        />
      )}
    </span>
  );
};
