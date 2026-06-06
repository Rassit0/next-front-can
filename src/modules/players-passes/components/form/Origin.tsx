import { TypeOriginPass } from "./TypeOriginPass";
import {
  IClubOptionsByDiscipline,
  IDisciplineOptions,
  IPlayerPassActiveOptions,
  ITeamsByClubOptions,
  PlayerPassOriginType,
  PlayerPassPreviousTeamSourceType,
} from "@/modules/players-passes";
import { Dispatch, SetStateAction } from "react";
import { RadioPreviousTeamSource } from "./RadioPreviousTeamSource";
import {
  Button,
  cn,
  Disclosure,
  DisclosureGroup,
  FieldError,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { SelectCurrentPass } from "./SelectCurrentPass";
import { SelectDiscipline } from "./SelectDiscipline";
import { SelectClub } from "./SelectClub";
import { SelectTeam } from "./SelectTeam";

interface Props {
  activePassesOptions: IPlayerPassActiveOptions[];
  originType: PlayerPassOriginType;
  setOriginType: Dispatch<SetStateAction<PlayerPassOriginType>>;
  previousTeamSource: PlayerPassPreviousTeamSourceType;
  setPreviousTeamSource: Dispatch<
    SetStateAction<PlayerPassPreviousTeamSourceType>
  >;
  expandedKeys: Set<string | number>;
  setExpandedKeys: Dispatch<SetStateAction<Set<string | number>>>;
  currentPassId: string | null;
  setCurrentPassId: Dispatch<SetStateAction<string | null>>;
  clubsOptions: IClubOptionsByDiscipline[];
  previousClubId: string | null;
  setPreviousClubId: Dispatch<SetStateAction<string | null>>;
  previousTeamsOptions: ITeamsByClubOptions[];
  previousTeamId: string | null;
  setPreviousTeamId: Dispatch<SetStateAction<string | null>>;
  externalPreviousTeamName: string | null;
  setExternalPreviousTeamName: Dispatch<SetStateAction<string | null>>;
  errors: Record<string, string>;
  handleRemoveError: (fieldName: string) => void;
}
export const Origin = ({
  activePassesOptions,
  originType,
  setOriginType,
  previousTeamSource,
  setPreviousTeamSource,
  expandedKeys,
  setExpandedKeys,
  currentPassId,
  setCurrentPassId,
  clubsOptions,
  previousClubId,
  setPreviousClubId,
  previousTeamId,
  setPreviousTeamId,
  externalPreviousTeamName,
  setExternalPreviousTeamName,
  previousTeamsOptions,
  errors,
  handleRemoveError,
}: Props) => {
  return (
    <div className="flex flex-col gap-6 p-2">
      <TypeOriginPass
        originType={originType}
        setOriginType={setOriginType}
        errors={errors}
        handleRemoveError={handleRemoveError}
      />
      {originType === "EXTERNAL" && (
        <RadioPreviousTeamSource
          previousTeamSource={previousTeamSource}
          setPreviousTeamSource={setPreviousTeamSource}
          errors={errors}
          handleRemoveError={handleRemoveError}
        />
      )}

      {activePassesOptions.length > 0 && (
        <SelectCurrentPass
          isRequired={expandedKeys.has("1")}
          activePassesOptions={activePassesOptions}
          currentPassId={currentPassId}
          setCurrentPassId={setCurrentPassId}
          errors={errors}
          handleRemoveError={handleRemoveError}
        />
      )}

      {activePassesOptions.length === 0 && previousTeamSource === "SYSTEM" && (
        <>
          <SelectClub
            isRequired={expandedKeys.has("2")}
            label="CLUB ANTERIOR"
            clubOptions={clubsOptions}
            clubId={previousClubId}
            setClubId={setPreviousClubId}
            errors={errors}
            handleRemoveError={handleRemoveError}
          />
          <SelectTeam
            isRequired={expandedKeys.has("2")}
            label="EQUIPO ANTERIOR"
            teamsOptions={previousTeamsOptions}
            currentTeamId={previousTeamId}
            setCurrentTeamId={setPreviousTeamId}
            errors={errors}
            handleRemoveError={handleRemoveError}
          />
        </>
      )}

      {originType === "EXTERNAL" && previousTeamSource === "EXTERNAL" && (
        <>
          <TextField
            isRequired
            className="w-full"
            name="externalPreviousTeamName"
            type="text"
            isInvalid={!!errors.nexternalPreviousTeamNameame || undefined}
          >
            <Label>NOMBRE DEL EQUIPO EXTERNO</Label>
            <Input
              variant="secondary"
              value={externalPreviousTeamName || ""}
              onChange={(e) => {
                setExternalPreviousTeamName(e.target.value || null);
                handleRemoveError("externalPreviousTeamName");
              }}
              placeholder="Ingrese el nombre del equipo"
            />
            <FieldError
              children={
                errors.externalPreviousTeamName && (
                  <> {errors.externalPreviousTeamName}</>
                )
              }
            />
          </TextField>
        </>
      )}
    </div>
  );
};
