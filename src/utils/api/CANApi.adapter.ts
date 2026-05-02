import { ApiError } from "../errors/ApiError";

export interface HttpAdapter {
  get<T>(endpoint: string, options?: RequestInit): Promise<T>;
  post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T>;
  patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T>;
  put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T>;
  delete<T>(endpoint: string, options?: RequestInit): Promise<T>;
}

export class CANApiAdapter implements HttpAdapter {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_CAN_API_URL || "";
  }

  private async handleResponse<T>(res: Response, endpoint: string): Promise<T> {
    const contentType = res.headers.get("content-type");

    if (res.ok) {
      if (contentType && contentType.includes("application/json")) {
        return res.json() as Promise<T>;
      } else {
        console.log("status", res.status);
        console.log("content-type", res.headers.get("content-type"));
        const text = await res.text();
        console.log("body", text);
        throw new ApiError(
          res.status,
          `Respuesta inesperada en ${endpoint}`,
          text,
        );
      }
    }

    // Manejo de errores
    let errorData: any = {};
    if (contentType && contentType.includes("application/json")) {
      errorData = await res.json().catch(() => ({}));
    } else {
      errorData = { raw: await res.text() };
    }

    const errorMap: Record<number, string> = {
      401: "Token inválido o expirado",
      403: "Acceso denegado",
      404: "Recurso no encontrado",
    };

    const message =
      errorData.message ||
      errorMap[res.status] ||
      `Error ${res.status}: ${res.statusText}`;

    throw new ApiError(res.status, message, errorData.errors || errorData);
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...options?.headers,
      },
      ...options,
    });

    return this.handleResponse<T>(res, endpoint);
  }

  async post<T>(
    endpoint: string,
    data: FormData | Record<string, any>,
    options?: RequestInit,
  ): Promise<T> {
    console.log("URL de petición:", `${this.baseUrl}${endpoint}`);
    const isFormData = data instanceof FormData;
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...options?.headers,
      },

      body: isFormData ? data : JSON.stringify(data),
      ...options,
    });

    return this.handleResponse<T>(res, endpoint);
  }

  async patch<T>(
    endpoint: string,
    data: FormData | Record<string, any>,
    options?: RequestInit,
  ): Promise<T> {
    const isFormData = data instanceof FormData;
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...options?.headers,
      },
      body: isFormData ? data : JSON.stringify(data),
      ...options,
    });

    return this.handleResponse<T>(res, endpoint);
  }

  async put<T>(
    endpoint: string,
    data: FormData | Record<string, any>,
    options?: RequestInit,
  ): Promise<T> {
    const isFormData = data instanceof FormData;
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...options?.headers,
      },
      body: isFormData ? data : JSON.stringify(data),
      ...options,
    });

    return this.handleResponse<T>(res, endpoint);
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        ...options?.headers,
      },
      ...options,
    });

    return this.handleResponse<T>(res, endpoint);
  }
}
