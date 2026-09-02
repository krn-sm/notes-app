const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";

type ValidationError = {
  msg?: string;
};

type ApiError = {
  detail?: string | ValidationError[];
};

const api = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    },
  );

  if (!response.ok) {
    const error: ApiError =
      await response.json().catch(() => ({}));

    if (typeof error.detail === "string") {
      throw new Error(error.detail);
    }

    if (
      Array.isArray(error.detail) &&
      error.detail.length > 0
    ) {
      throw new Error(
        error.detail[0].msg ||
          "Something went wrong",
      );
    }

    throw new Error(
      "Something went wrong",
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
};

export default api;