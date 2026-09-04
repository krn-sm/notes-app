const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";

type ApiResponse<T> = {
  status_code: number;
  status_message: string;
  error_message: string | null;
  response_data: T | null;
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

  const json: ApiResponse<T> =
    await response.json();

  if (!response.ok) {
    throw new Error(
      json.error_message ||
        json.status_message ||
        "Something went wrong",
    );
  }

  if (json.response_data === null) {
    return undefined as T;
  }

  return json.response_data;
};

export default api;
