import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { EXPRESS_SERVER } from "../api/backend_api";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                fetch(EXPRESS_SERVER + "/refresh", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + auth.accessToken,
                    },
                    credentials: 'include'
                })
                .then(async response => {
                    if (response.status === 200) {
                        const res = await response.json();
                        setAuth(prev => {
                            return { ...prev, accessToken: res.data.accessToken }
                        })
                        console.log(auth);
                    }
                })
                .catch((error) => {
                    // (TODO) handle error
                    console.log(error)
                });
            } catch (error) {
                console.error("Error refreshing access token:", error);
            }
        };

        // Set up timer to periodically refresh access token
        const refreshTime = 1000 * 60 * 5 // 5 minutes
        const intervalId = setInterval(() => {
            refreshAccessToken();
        }, refreshTime);

        return () => clearInterval(intervalId);
    }, [auth, setAuth]);
    
    return (
        auth?.user ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
    )
}

export default RequireAuth;