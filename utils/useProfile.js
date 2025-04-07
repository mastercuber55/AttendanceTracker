import { useAuth } from "./auth";

export default function useProfile() {

    const { token } = useAuth()
    
    const headers = {
        Authorization: `Bearer ${token}`,
      };

    const setDate = async (date, status) => {
        const res = await fetch(`${process.env.EXPO_PUBLIC_URL}/setDate`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ date, status }),
        });
        return await res.json();
      };

    return { setDate }
}