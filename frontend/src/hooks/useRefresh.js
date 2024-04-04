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

        setAuth(prev => {
            console.log(JSON.stringify.data.accessToken);
            console.log(response.data.accessToken);
            return {...prev, accessToken: response.data.accessToken};
        })
        return response.data.accessToken;
    }

    return refresh
}

export default useRefreshToken;