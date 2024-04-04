import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../../api/backend_api";
import "./devices_window.css";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "./../../hooks/useRefresh";

const DEVICE_ADD_ROUTE = '/devices/add'

const DevicesWindow = () => {

	const { auth } = useAuth();
	const refresh = useRefreshToken();

	const [deviceHostname, setDeviceHostname] = useState("");
	const [deviceDescription, setDeviceDescription] = useState("");
	const [deviceInterfaces, setDeviceInterfaces] = useState({});
	const [deviceMQTTSubTopic, setdeviceMQTTSubTopic] = useState('');
	const [deviceMQTTPubTopic, setdeviceMQTTPubTopic] = useState('');
	const [deviceMQTTUser, setdeviceMQTTUser] = useState('');
	const [deviceMQTTPwd, setdeviceMQTTPwd] = useState('');

	const handleCheckbox = async (e) => {
		const inter = e.target.attributes["data-inter"].value;
		const interActive = e.target.checked
		setDeviceInterfaces({ [inter]: interActive })
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newDevice = { deviceHostname, deviceDescription, deviceInterfaces, deviceMQTTSubTopic, deviceMQTTPubTopic };

		try {
			const accessToken = auth.accessToken;
			const response = await fetch(SERVER_URL + DEVICE_ADD_ROUTE, {
				method: "POST",
				body: JSON.stringify(newDevice),
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + auth.accessToken
				},
				credentials: 'include'
			});

			const res = await response.json();
			if (response.status === 200) {
				console.log(res);

			} else if (response.status === 403) {
				console.log(res);


			} else {
				console.log(res);

			}

		} catch (err) {
			console.log(err);
		}
	}

	return (
		<section className="devices-window__main-section">
			<section className="devices-window__subsection devices-window__create-devices-section">
				<h1 className="devices-window__subsection-title">Create New Device</h1>

				<form className="device-window__form" onSubmit={handleSubmit}>
					{/* InputLabel 1 */}
					<fieldset className="device-window__form__fieldset no-border">
						<label
							htmlFor="device-window__form__hostname"
							className="device-window__form__label"
						>
							Hostname *
						</label>
						<input
							type="text"
							className="devices-window__form__input"
							id="device-window__form__hostname"
							data-interface="mqtt"
							required
							autoComplete='false'
							onChange={(e) => { setDeviceHostname(e.target.value) }}
						/>
					</fieldset>
					{/* InputLabel 2 */}
					<fieldset className="device-window__form__fieldset no-border">
						<label
							htmlFor="device-window__form__description"
							className="device-window__form__label"
						>
							Description
						</label>
						<input
							type="text"
							className="devices-window__form__input"
							id="device-window__form__description"
							autoComplete='false'
							onChange={(e) => { setDeviceDescription(e.target.value) }}
						/>
					</fieldset>
					{/* InputLabel 3 */}
					<fieldset className="device-window__form__fieldset">
						<legend>Select a connectivity interface</legend>
						<div>
							<input
								type="checkbox"
								className="devices-window__form__input"
								id="device-window__form__interface"
								defaultChecked
								data-inter='mqtt'
								onChange={(e) => { handleCheckbox(e) }}
							/>
							<label
								htmlFor="device-window__form__interface"
								className="device-window__form__label"
							>
								MQTT
							</label>
						</div>
					</fieldset>
					{/* InputLabel 4  (TODO: Bellow options should appear dynamically when MQTT is selected) */}
					<fieldset className="device-window__form__fieldset no-border">
						<label
							htmlFor="device-window__form__subscribe"
							className="device-window__form__label"
						>
							Subscribe Topic *
						</label>
						<input
							type="text"
							className="devices-window__form__input"
							id="device-window__form__subscribe"
							autoComplete='false'
							required
							onChange={(e) => { setdeviceMQTTSubTopic(e.target.value) }}
						/>
					</fieldset>
					{/* InputLabel 5 */}
					<fieldset className="device-window__form__fieldset no-border">
						<label
							htmlFor="device-window__form__publish"
							className="device-window__form__label"
						>
							Publish Topic *
						</label>
						<input
							type="text"
							className="devices-window__form__input"
							id="device-window__form__publish"
							autoComplete='false'
							required
							onChange={(e) => { setdeviceMQTTPubTopic(e.target.value) }}
						/>
					</fieldset>
					<button
						className="device-window__form__btn"
					>
						Create new device
					</button>
				</form>
			</section>

			<section className="devices-window__subsection devices-window__list-devices-section">
				<h1 className="devices-window__subsection-title">Devices (TODO)</h1>
				<button onClick={() => refresh()}>refresh</button>
			</section>
		</section>
	);
};

export default DevicesWindow;
