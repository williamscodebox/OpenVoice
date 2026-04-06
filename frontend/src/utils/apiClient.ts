// apiClient.ts
export async function callBackend<TResponse>(
  endpoint: string,
  options: RequestInit = {}
): Promise<TResponse> {
  const baseUrl = "http://localhost:8000/api/";

  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }

  return res.json() as Promise<TResponse>;
}
