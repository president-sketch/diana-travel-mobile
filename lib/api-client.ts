import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

let _baseUrl: string | null = null;

export function setBaseUrl(url: string | null): void {
  _baseUrl = url ? url.replace(/\/+$/, "") : null;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = _baseUrl ? `${_baseUrl}${path}` : path;
  const res = await fetch(url, init);
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw Object.assign(new Error(`HTTP ${res.status}`), { data });
  }
  if (res.status === 204) return null as T;
  return res.json() as Promise<T>;
}

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  message: string;
}

export const useSubmitContact = <TError = unknown, TContext = unknown>(
  options?: {
    mutation?: UseMutationOptions<
      ContactResponse,
      TError,
      { data: ContactRequest },
      TContext
    >;
  }
): UseMutationResult<ContactResponse, TError, { data: ContactRequest }, TContext> => {
  return useMutation<ContactResponse, TError, { data: ContactRequest }, TContext>({
    mutationKey: ["submitContact"],
    mutationFn: ({ data }) =>
      apiFetch<ContactResponse>("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    ...options?.mutation,
  });
};
