import React, { useState, useRef, useEffect } from "react";
import useAuth from "./../../hooks/useAuth";
import Navbar from "../Navbar/Navbar";
import Window from "../Window/Window";
import { EXPRESS_SERVER } from "../../api/backend_api";
import "./configuration_page.css";
import useDevicesData from "../../hooks/useDevicesData";

function DashboardPage() {
	const { auth } = useAuth();
    const { devices , addDevice, removeDevice } = useDevicesData();

	const [newDevice, setNewDevice] = useState("");
	const [isFormWindowOpen, setIsFormWindowOpen] = useState(false);

	const addHostBtnRef = useRef(null);


    // functions
	const handleSubscription = (event) => {
		event.preventDefault();
		fetch(EXPRESS_SERVER + "/devices/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + auth.accessToken,
			},
            credentials: 'include',
			body: JSON.stringify({ newDevice }),
		})
        .then(response => {
            if (response.status === 201) {
                addDevice(newDevice)
            }
        })
        .catch((error) => {
            // (TODO) handle error
            console.log(error);
        });
	};

	const handleUnsubscription = (event) => {
		event.preventDefault();
		fetch(EXPRESS_SERVER + "/devices/remove", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + auth.accessToken,
			},
			body: JSON.stringify({ newDevice }),
		})
        .then(response => {
            if (response.status === 201) {
                removeDevice(newDevice)
            }
        })
        .catch((error) => {
            // (TODO) handle error
            console.log(error); 
        });
	};

    const openFormWindow = (e) => {
		setIsFormWindowOpen(true);
		addHostBtnRef.current.disabled = true;
	};

	const closeFormWindow = () => {
		setIsFormWindowOpen(false);
		addHostBtnRef.current.disabled = false;
	};

    // useEffect
    useEffect(() => {
        fetch(EXPRESS_SERVER + "/devices", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth.accessToken,
            },
        })
        .then(async response => {
            const res = await response.json()
            for (let device of res.devices) {
                if (!devices.includes(device)) {
                    addDevice(device)
                }
            }
            
            
        })
        .catch((error) => {
            // (TODO) handle error
            console.log(error);
        });
    }, []);

	return (
		<>
			<Navbar
				extraChildren={
					<button onClick={openFormWindow} ref={addHostBtnRef}>
						Add host
					</button>
				}
			/>
			{isFormWindowOpen && (
				<Window
					isWindowClosed={closeFormWindow}
					children={
						<AddHost
							inputOnChange={setNewDevice}
							subscribeOnClick={handleSubscription}
							unsubscribeOnClick={handleUnsubscription}
						/>
					}
				/>
			)}
			<section className="ConfigurationPage__section">
                <div>
                    {devices && devices.map( (device, key) => <p key={key}>{device}</p>)}
                </div>
			</section>
		</>
	);
}

const AddHost = ({ inputOnChange, subscribeOnClick, unsubscribeOnClick }) => {
    return (
        <section className="dashboard-page__section">
            <h1>Manage Subscriptions</h1>
            <form className="dashboard-page__form">
                <label htmlFor="dashboard-page__form__input">Subscription</label>
                <input
                    type="text"
                    id="dashboard-page__form__input"
                    onChange={(e) => inputOnChange(e.target.value)}
                />
                <button type="submit" onClick={subscribeOnClick}>
                    Subscribe
                </button>
                <button type="submit" onClick={unsubscribeOnClick}>
                    Unsubscribe
                </button>
            </form>
        </section>
    );
};

export default DashboardPage;
