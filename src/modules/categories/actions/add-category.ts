"use server";
import { api } from "@/utils/api";
import { ServiceResponse } from "@/types/apit";
import { ApiError } from "@/utils/errors/ApiError";
import { updateTag } from "next/cache";
import { Gender, ICategory } from "../interfaces/category.interface";

interface Props {
  data: {
    name: string;
    minAge: number;
    maxAge: number;
    gender: Gender;
    description: string;
  };
}

export const addCategory = async ({
  data,
}: Props): Promise<ServiceResponse<ICategory>> => {
  try {
    console.log("data", data);

    const res = await api.post<{ message: string; data: ICategory }>(
      `categories`,
      data,
    );

    updateTag("categories");
    return {
      error: false,
      data: res.data,
      message: res.message || "Categoría agregada exitosamente",
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
