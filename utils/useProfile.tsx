import { useAuth } from "./auth";

export default function useProfile() {
  const { token } = useAuth();

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const setStatus = async (date: String, status: String) => {
    const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/setStatus`, {
      method: "POST",
      headers,
      body: JSON.stringify({ date, status }),
    });
    return await res.json();
  };

  return { setDate: setStatus };
}
