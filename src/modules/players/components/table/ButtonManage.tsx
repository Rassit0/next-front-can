"use client";
import { Button, Tooltip } from "@heroui/react";
import { DashboardCircleEditIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  id: string;
}
export const ButtonManage = ({ id }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleGestion = () => {
    router.push(`${pathname}/${id}`);
  };
  return (
    <Tooltip delay={0}>
      <Button
        isIconOnly
        className="hover:bg-accent/30"
        size="sm"
        variant="ghost"
        onClick={handleGestion}
      >
        <HugeiconsIcon icon={DashboardCircleEditIcon} />
      </Button>
      <Tooltip.Content>
        <p>Gestionar</p>
      </Tooltip.Content>
    </Tooltip>
  );
};
