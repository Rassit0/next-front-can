import { api } from "@/utils/api";
import { ServiceResponse } from "@/types/api";
import { GroupType, IActivitiesResponse } from "../interfaces/group.interface";
import { handleServerAction } from "@/utils";

interface SearchParams {
  search?: string;
  parentId?: number;
  per_page?: string;
  page?: string;
  type?: GroupType;
  organizationId?: number;
  callbackUrl?: string;
}

export const getGroups = async ({
  search,
  parentId,
  per_page = "5",
  page = "1",
  type,
  organizationId,
}: SearchParams): Promise<ServiceResponse<IActivitiesResponse>> => {
  return handleServerAction(async () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (per_page) params.set("per_page", per_page);
    if (page) params.set("page", page);
    if (type) params.set("type", type);
    if (organizationId) params.set("organizationId", organizationId.toString());
    if (parentId) params.set("parentId", parentId.toString());
    const res = await api.get<IActivitiesResponse>(
      `groups?${params.toString()}`,
      {
        next: {
          tags: [
            "groups",
            "categories",
            "disciplines",
            "organizations",
            "activities",
          ],
          revalidate: 3600,
        },
      },
    );

    const data = res.data.map((activity) => ({
      ...activity,
      startDate: new Date(activity.startDate),
      endDate: new Date(activity.endDate),
    }));

    return {
      error: false,
      data: {
        ...res,
        data,
      },
      message: res.message || "Grupos obtenidos exitosamente",
    };
  });
};
