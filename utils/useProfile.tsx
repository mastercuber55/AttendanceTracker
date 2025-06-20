import { useAuth } from "./auth";

const custoFetch = async(method: string, endpoint: string, body: any = {}) => {
const { token } = useAuth();

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/${endpoint}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  return res
}

export default function useProfile() {
  

  const setStatus = async (date: String, status: String) => {
    const res = await custoFetch("PATCH", "setStatus", {date, status})
    return await res.text()
  };

  const getAttendance = async() => {
    const res = await custoFetch("GET", "getAttendance")
    return await res.json()
  }

  return { setStatus, getAttendance };
}
