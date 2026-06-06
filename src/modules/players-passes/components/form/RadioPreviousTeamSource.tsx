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
  DatabaseIcon,
  GeometricShapes01Icon,
  NoteEditIcon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import clsx from "clsx";
import {
  PlayerPassOriginType,
  PlayerPassPreviousTeamSourceType,
} from "@/modules/players-passes";
import { Dispatch, SetStateAction } from "react";

const tipePreviousTeamSource: {
  value: PlayerPassPreviousTeamSourceType;
  icon: any;
  label: string;
  description: string;
}[] = [
  {
    value: "SYSTEM",
    icon: DatabaseIcon,
    label: "Sistema",
    description: "Equipo dentro de la Organización.",
  },
  {
    value: "EXTERNAL",
    icon: NoteEditIcon,
    label: "Externo",
    description: "El viene de un club externo.",
  },
];

interface Props {
  previousTeamSource: PlayerPassPreviousTeamSourceType;
  setPreviousTeamSource: Dispatch<
    SetStateAction<PlayerPassPreviousTeamSourceType>
  >;
  errors: Record<string, string>;
  handleRemoveError: (fieldName: string) => void;
}

export const RadioPreviousTeamSource = ({
  previousTeamSource,
  setPreviousTeamSource,
  errors,
  handleRemoveError,
}: Props) => {
  return (
    <RadioGroup
      isInvalid={!!errors.previousTeamSource || undefined}
      defaultValue="SYSTEM"
      name="previousTeamSource"
      variant="primary"
      value={previousTeamSource}
      onChange={(value) => {
        setPreviousTeamSource(value as PlayerPassPreviousTeamSourceType);
        handleRemoveError("previousTeamSource");
      }}
    >
      <Label className="text-lg">Fuente del equipo previo</Label>
      <div className="grid gap-4 sm:grid-cols-2">
        {tipePreviousTeamSource.map((previousTeamSource) => (
          <Radio
            key={previousTeamSource.value}
            value={previousTeamSource.value}
            className={clsx(
              "group relative flex-col gap-4 rounded-xl border border-transparent bg-default px-3 py-2 mt-0 transition-all data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
              "data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10",
              "items-center",
            )}
          >
            <Radio.Control className="absolute top-3 right-4 size-5">
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content className="flex flex-row items-center gap-6">
              <HugeiconsIcon icon={previousTeamSource.icon} size={30} />
              <div className="flex flex-col gap-1 items-start">
                <Label className="text-lg font-bold">
                  {previousTeamSource.label}
                </Label>
                <Description className="text-xs">
                  {previousTeamSource.description}
                </Description>
              </div>
            </Radio.Content>
          </Radio>
        ))}
      </div>
      <FieldError
        children={
          errors.previousTeamSource && <p>{errors.previousTeamSource}</p>
        }
      />
    </RadioGroup>
  );
};
