export const saveSubscription = async (deviceToken: string) => {
  const ORIGIN = window.location.origin;
  const BACKEND_URL = `${ORIGIN}/api/device-token`;

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ deviceToken }),
    cache: "no-store",
  });
  return response.json();
};
