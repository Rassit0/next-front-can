import { iconMap } from "@/utils";
import {
  Card,
  Description,
  FieldError,
  Label,
  Radio,
  RadioGroup,
} from "@heroui/react";
import {
  ArrowDataTransferDiagonalIcon,
  ArrowDataTransferHorizontalIcon,
  GeometricShapes01Icon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";
import { PlayerPassOriginType } from "@/modules/players-passes";
import { Dispatch, SetStateAction } from "react";

const tipeActivities: {
  value: PlayerPassOriginType;
  icon: any;
  label: string;
  description: string;
}[] = [
  {
    value: "INTERNAL",
    icon: ArrowDataTransferHorizontalIcon,
    label: "Interno",
    description: "El viene de un club interno.",
  },
  {
    value: "EXTERNAL",
    icon: ArrowDataTransferDiagonalIcon,
    label: "Externo",
    description: "El viene de un club externo.",
  },
  {
    value: "FREE_AGENT",
    icon: UserCircleIcon,
    label: "Agente Libre",
    description: "El jugador no pertenece a ningun club.",
  },
];

interface Props {
  originType: PlayerPassOriginType;
  setOriginType: Dispatch<SetStateAction<PlayerPassOriginType>>;
  errors: Record<string, string>;
  handleRemoveError: (fieldName: string) => void;
}

export const TypeOriginPass = ({
  originType,
  setOriginType,
  errors,
  handleRemoveError,
}: Props) => {
  return (
    <RadioGroup
      isInvalid={!!errors.originType || undefined}
      defaultValue="express"
      name="delivery"
      variant="secondary"
      value={originType}
      onChange={(value) => {
        setOriginType(value as PlayerPassOriginType);
        handleRemoveError("originType");
      }}
    >
      {/* <Label className="font-headline text-xl font-bold">Tipo de pase</Label> */}
      <div className="grid gap-x-4 sm:grid-cols-3">
        {tipeActivities.map((originType) => (
          <Radio
            key={originType.value}
            value={originType.value}
            className={clsx(
              "group relative flex-col gap-1 rounded-xl border border-transparent bg-default px-3 py-2 transition-all data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
              "data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10",
              "items-center",
            )}
          >
            <Radio.Control className="absolute top-3 right-4 size-5">
              <Radio.Indicator />
            </Radio.Control>
            <HugeiconsIcon icon={originType.icon} size={40} />
            <Radio.Content>
              <div className="flex flex-col items-center">
                <Label className="text-xl font-bold">{originType.label}</Label>
                <Description className="text-sm text-center">
                  {originType.description}
                </Description>
              </div>
            </Radio.Content>
          </Radio>
        ))}
      </div>
      <FieldError children={errors.originType && <p>{errors.originType}</p>} />
    </RadioGroup>
  );
};
