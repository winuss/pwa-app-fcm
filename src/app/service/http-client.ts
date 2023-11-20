const requestAPI = async (url: string, method: string, body: any = null) => {
  const ORIGIN = window.location.origin;
  const headers = {
    "Content-Type": "application/json",
  };

  const BACKEND_URL = `${ORIGIN}/${url}`;

  const response = await fetch(BACKEND_URL, {
    method: method,
    headers: headers,
    cache: "no-store",
    body: body && JSON.stringify(body),
  });

  const data = await response.json();

  return data;
};

export const httpClient = {
  get: async (url: string) => {
    return requestAPI(url, "GET");
  },
  put: async (url: string, body: any = null) => {
    return requestAPI(url, "PUT", body);
  },
  post: async (url: string, body: any = null) => {
    return requestAPI(url, "POST", body);
  },
};
