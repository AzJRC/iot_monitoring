import { createContext, useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import { EXPRESS_SERVER, SOCKET_SERVER } from "./../api/backend_api";
import useAuth from "./../hooks/useAuth";

const DevicesDataContext = createContext({});
const socket = io("http://localhost:2357");

export const DevicesDataProvider = () => {
    
    const { auth } = useAuth();
    const [data, setData] = useState({});
    const [devices, setDevices] = useState([]);

    const addDevice = (deviceToAdd) => {
        setDevices([...devices, deviceToAdd]);
        socket.on(deviceToAdd);
    }

    const removeDevice = (deviceToRemove) => {
        const updatedDevices = devices.filter(device => device !== deviceToRemove);
        setDevices(updatedDevices);
        socket.off(deviceToRemove);
    };

    useEffect(() => {
        devices.forEach(device => {
            // Create a separate function for the event handler
            const handleSocketData = (data) => {
                setData(prevData => ({
                    ...prevData,
                    [device]: data 
                }));
            };
            
            // Attach event listener
            socket.on(device, handleSocketData)
        });
    }, [devices, data]);

    
    // setDevices
    useEffect(() => {
        fetch(EXPRESS_SERVER + "/devices", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth.accessToken,
            },
            credentials: 'include'
        })
        .then(async response => {
            const res = await response.json();
            setDevices([...res.devices]);
        })
        .catch((error) => {
            // (TODO) handle error
            console.log(error) /* TODO REMOVE */
        });
    }, []);
    
    return (
        <DevicesDataContext.Provider value={{ data, devices, addDevice, removeDevice }}>
            <Outlet />
        </DevicesDataContext.Provider>
    )
}

export default DevicesDataContext;