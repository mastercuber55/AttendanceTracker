import { useAuth } from "./auth";

const URL = "https://attendancetrackerapi.netlify.app/.netlify/functions/"

export default function useProfile() {

    const { token } = useAuth()
    
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

    const setDate = async (date, status) => {
        const res = await fetch(`${URL}/setDate`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ date, status }),
        });
        return await res.json();
      };

    return { setDate }
}