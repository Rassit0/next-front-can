"use server";
import { api } from "@/utils/api";
import { ServiceResponse } from "@/types/api";
import { updateTag } from "next/cache";
import { Gender, ITeam } from "@/modules/teams";
import { handleServerAction } from "@/utils";

export const addTeam = async (data: {
  name: string;
  minAge: number;
  maxAge: number;
  imageUrl?: string;
  clubId: string;
  gender: Gender;
}): Promise<ServiceResponse<ITeam>> => {
  return handleServerAction(async () => {
    const response = await api.post<{ message: string; data: ITeam }>(
      `teams`,
      data,
    );

    updateTag("teams");
    return {
      error: false,
      data: response.data,
      message: response.message || "Equipo agregado exitosamente",
    };
  });
};
