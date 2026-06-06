"use server";
import { api } from "@/utils/api";
import { ServiceResponse } from "@/types/api";
import { ApiError } from "@/utils/errors/ApiError";
import { updateTag } from "next/cache";
import { IPlayer, PostPlayerPassInterface } from "@/modules/players-passes";
import { handleServerAction } from "@/utils";

interface Props {
  data: PostPlayerPassInterface;
}

export const addPlayerPass = async ({
  data,
}: Props): Promise<ServiceResponse<IPlayer>> => {
  return handleServerAction(async () => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("playerId", data.playerId);
    if (data.previousTeamId)
      formData.append("previousTeamId", data.previousTeamId);
    if (data.externalPreviousTeamName)
      formData.append(
        "externalPreviousTeamName",
        data.externalPreviousTeamName,
      );
    formData.append("currentTeamId", data.currentTeamId);
    formData.append("previousTeamSource", data.previousTeamSource);
    formData.append("originType", data.originType);
    formData.append("startDate", data.startDate.toISOString());
    formData.append("status", data.status);
    if (data.notes) formData.append("notes", data.notes);

    const res = await api.post<{ message: string; data: IPlayer }>(
      `player-passes`,
      formData,
    );

    updateTag("player-passes");
    return {
      error: false,
      data: res.data,
      message: res.message || "Pase de jugador agregado exitosamente",
    };
  });
};
