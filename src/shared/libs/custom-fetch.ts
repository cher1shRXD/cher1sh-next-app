import { cookies } from "next/headers";

const request = async <T>(url: string, options: RequestInit = {}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const authorization = { Authorization: `Bearer ${accessToken}` };

    const fetchOptions: RequestInit = {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(accessToken ?  authorization : {})
       
      },
      credentials: 'include'
    };

    if (fetchOptions.body instanceof FormData) {
      fetchOptions.headers = fetchOptions.headers
        ? { ...fetchOptions.headers }
        : {};
    } else {
      fetchOptions.headers = fetchOptions.headers
        ? { ...fetchOptions.headers, "Content-Type": "application/json" }
        : { "Content-Type": "application/json" };
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+url, fetchOptions);

    if(!response.ok) {
      throw new Error(`${response.status || 500}`);
    }

    const res = (await response.json()) as T;

    return { data: res, status: response.status };
  } catch (e) {
    throw e;
  }
};

export const customFetch = {
  get: <T>(url: string) => request<T>(url),

  post: <T>(url: string, body: object) =>
    request<T>(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(url: string, body: object) =>
    request<T>(url, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(url: string) =>
    request<T>(url, {
      method: "DELETE",
    }),
};
