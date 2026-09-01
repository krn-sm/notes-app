const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000"

type ApiError = {
  detail?: string
}

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
  )

  if (!response.ok) {
    const error: ApiError =
      await response.json().catch(() => ({}))

    throw new Error(
      error.detail || "Something went wrong",
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}

export default api