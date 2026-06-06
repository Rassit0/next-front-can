import { api } from "@/utils/api";
import { ServiceResponse } from "@/types/api";
import { IActivity } from "../interfaces/group.interface";
import { handleServerAction } from "@/utils";

interface SearchParams {
  id: number;
  callbackUrl?: string;
}

export const getGroupById = async ({
  id,
}: SearchParams): Promise<ServiceResponse<IActivity>> => {
  return handleServerAction(async () => {
    const res = await api.get<{ message: string; data: IActivity }>(
      `groups/${id}`,
      {
        next: {
          tags: [
            "groups",
            "categories",
            "disciplines",
            "organizations",
            "activities",
          ],
          revalidate: 3600 * 24, // 24 horas
        },
      },
    );

    return {
      error: false,
      data: {
        ...res.data,
        startDate: new Date(res.data.startDate),
        endDate: new Date(res.data.endDate),
      },
      message: res.message || "Grupo obtenido exitosamente",
    };
  });
};
