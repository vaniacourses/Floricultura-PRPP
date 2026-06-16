const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const getToken = (): string | null => localStorage.getItem("token");

const mensagemErroHttp = (status: number, body: string) => {
  if (body) {
    try {
      const data = JSON.parse(body);
      if (typeof data.message === "string" && data.message.trim()) return data.message;
      if (typeof data.error === "string" && data.error.trim()) return data.error;
    } catch {
    
    }
  }

  if (status === 401) return "Sua sessão expirou. Faça login novamente.";
  if (status === 403) return "Você não tem permissão para realizar esta ação.";
  if (status === 404) return "Recurso não encontrado.";
  if (status === 409) return "Não foi possível concluir a ação por conflito de dados.";
  if (status >= 500) return "Erro interno no servidor. Tente novamente em instantes.";
  return `Erro ${status}`;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers as Record<string, string>),
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    const error = new Error(mensagemErroHttp(response.status, errorBody));
    (error as any).status = response.status; 
    throw error;
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

export const api = {
  get: <T>(path: string, params?: Record<string, string>) => {
    const query = params
      ? `?${new URLSearchParams(
          Object.entries(params).filter(([, v]) => v)
        )}`
      : "";

    return request<T>(`${path}${query}`);
  },
  post: <T>(path: string, body: any) => request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: any) => request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
