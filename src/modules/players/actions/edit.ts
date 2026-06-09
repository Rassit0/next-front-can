"use server";
import { api } from "@/utils/api";
import { ServiceResponse } from "@/types/api";
import { updateTag } from "next/cache";
import { IPlayer, PostPlayerInterface } from "@/modules/players";
import { handleServerAction } from "@/utils";

interface Props {
  id: string;
  data: PostPlayerInterface;
}

export const editPlayer = async ({
  id,
  data,
}: Props): Promise<ServiceResponse<IPlayer>> => {
  return handleServerAction(async () => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("name", data.person.name);
    formData.append("lastName", data.person.lastName);
    if (data.person.secondLastName)
      formData.append("secondLastName", data.person.secondLastName);
    if (data.person.birthDate)
      formData.append("birthDate", data.person.birthDate.toISOString());
    //imagen si esque hay
    if (data.person.imageUrl) formData.append("imageUrl", data.person.imageUrl);

    formData.append("documentType", data.person.documentType);
    formData.append("documentNumber", data.person.documentNumber);
    if (data.person.phone) formData.append("phone", data.person.phone);
    if (data.person.email) formData.append("email", data.person.email);
    if (data.person.address) formData.append("address", data.person.address);
    formData.append("gender", data.person.gender);
    formData.append("isActive", data.isActive.toString());

    const res = await api.patch<{ message: string; data: IPlayer }>(
      `players/${id}`,
      formData,
    );

    console.log(res);

    updateTag("players");
    return {
      error: false,
      data: res.data,
      message: res.message || "Jugador editado exitosamente",
    };
  });
};
