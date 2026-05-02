"use server";
import { api } from "@/utils/api";
import { ServiceResponse } from "@/types/apit";
import { ApiError } from "@/utils/errors/ApiError";
import { updateTag } from "next/cache";
import { IPerson } from "@/modules/persons";

interface Props {
  data: {
    ci: string;
    name: string;
    lastName: string;
    surName?: string;
    email?: string;
    phone?: string;
    phoneEmergency?: string;
    address?: string;
    birthDate?: Date;
    standardSize?: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
    image?: File;
  };
}

export const addPerson = async ({
  data,
}: Props): Promise<ServiceResponse<IPerson>> => {
  try {
    console.log("data", data.birthDate?.toISOString());
    const formData = new FormData();
    formData.append("ci", data.ci);
    formData.append("name", data.name);
    formData.append("lastName", data.lastName);
    if (data.surName) formData.append("surName", data.surName);
    if (data.email) formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);
    if (data.phoneEmergency)
      formData.append("phoneEmergency", data.phoneEmergency);
    if (data.address) formData.append("address", data.address);
    if (data.birthDate)
      formData.append("birthDate", data.birthDate.toISOString());
    if (data.standardSize) formData.append("standardSize", data.standardSize);
    if (data.image) formData.append("image", data.image);

    const res = await api.post<{ message: string; data: IPerson }>(
      `persons`,
      formData,
    );

    updateTag("persons");
    return {
      error: false,
      data: res.data,
      message: res.message || "Persona agregada exitosamente",
    };
  } catch (error: any) {
    // 1. Manejo de Errores Controlados (API)
    if (error instanceof ApiError) {
      console.warn(`[ApiError ${error.statusCode}]: ${error.message}`);

      // Devolvemos el error en un formato que el frontend pueda procesar fácilmente
      return {
        error: true,
        message: error.message,
        errors: error.errors, // Aquí vienen los errores de validación (ej: campos requeridos)
        statusCode: error.statusCode,
      };
    }

    // 2. Manejo de Errores Inesperados (System Error)
    console.error("[System Error]:", error); // Loguear para el backend (ej: Sentry, Winston)

    return {
      error: true,
      message: "Ocurrió un error inesperado. Por favor, intenta más tarde.",
      statusCode: 500,
    };
  }
};
