import { createContext, useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import { EXPRESS_SERVER, SOCKET_SERVER } from "./../api/backend_api";
import useAuth from "./../hooks/useAuth";

const DevicesDataContext = createContext({});
const socket = io("http://206.189.225.86:2357");

export const DevicesDataProvider = () => {

	const { auth } = useAuth();
	const [data, setData] = useState({});
	const [devices, setDevices] = useState([]);

	const addDevice = (deviceToAdd) => {
		setDevices([...devices, deviceToAdd]);
		try {
			socket.on(device, handleSocketData)
		} catch {
			// console.log('epa1') Don't know why but cathing this makes eveything work
		}
	}

	const removeDevice = (deviceToRemove) => {
		const updatedDevices = devices.filter(device => device !== deviceToRemove);
		setDevices(updatedDevices);
		try {
			socket.off(device, handleSocketData)
		} catch {
			// console.log('epa2') Don't know why but cathing this makes eveything work
		}
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
			//console.log(data)


			// Attach event listener
			try {
				socket.on(device, handleSocketData)
			} catch {
				// console.log('epa3') Don't know why but cathing this makes eveything work
			}

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
