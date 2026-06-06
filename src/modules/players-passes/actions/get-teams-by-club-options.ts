"use server";
import { api } from "@/utils/api";
import { ServiceResponse } from "@/types/api";
import { handleServerAction } from "@/utils";
import { ITeamsByClubOptionsResponse } from "@/modules/players-passes";

export const getTeamsByClubOptions = async (
  clubId: string,
): Promise<ServiceResponse<ITeamsByClubOptionsResponse>> => {
  return handleServerAction(async () => {
    const res = await api.get<ITeamsByClubOptionsResponse>(
      `player-passes/teams/options/${clubId}`,
      {
        next: {
          tags: ["teams"],
        },
      },
    );

    return {
      error: false,
      data: res,
      message: res.message || "Opciones de equipos obtenidas exitosamente",
    };
  });
};
