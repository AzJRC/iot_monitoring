import useAuth from "./useAuth";
import { SERVER_URL } from "../api/backend_api";

const REFRESH_ENDPOINT = "/refresh"

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await fetch(SERVER_URL + REFRESH_ENDPOINT, {
            method: "GET",
            credentials: 'include'
        });

        if (response.status === 200) {
            const res = await response.json();
            setAuth(prev => {
                return { ...prev, accessToken: res.accessToken }
            })
            return res.accessToken
        }
    }

    return refresh
}

export default useRefreshToken;