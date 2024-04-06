import React, { useState, useEffect } from "react";
import useAuth from "./../../hooks/useAuth";
import Navbar from "../Navbar/Navbar"
import MonitorWindow from "../MonitorWindow/MonitorWindow";
import useRefreshToken from "../../hooks/useRefresh";
import { SERVER_URL } from "../../api/backend_api";
import "./dashboard_page.css";

function DashboardPage() {
	const { auth } = useAuth();
	const [topic, setTopic] = useState("");


	const handleSubscription = (event) => {
		event.preventDefault();
		fetch(SERVER_URL + "/devices/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + auth.accessToken,
			},
			body: JSON.stringify({ topic }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				// Handle success or error response
			})
			.catch((error) => {
				console.error("Error:", error);
				// Handle error
			});
	};

	const handleUnsubscription = (event) => {
		event.preventDefault();
		fetch(SERVER_URL + "/devices/remove", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + auth.accessToken,
			},
			body: JSON.stringify({ topic }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				// Handle success or error response
			})
			.catch((error) => {
				console.error("Error:", error);
				// Handle error
			});
	};


	return (
		<>
			<Navbar />
			<section className="dashboard-page__section">
				<h1>Manage Subscriptions</h1>
				<form className="dashboard-page__form">
					<label htmlFor="dashboard-page__form__input">Subscription</label>
					<input
						type="text"
						id="dashboard-page__form__input"
						onChange={(e) => setTopic(e.target.value)}
					/>
					<button type="submit" onClick={handleSubscription}>
						Subscribe
					</button>
					<button type="submit" onClick={handleUnsubscription}>
						Unsubscribe
					</button>
				</form>
			</section>
			<section className="dashboard-page__section">
				<h1>Monitor devices</h1>
                <div>
                    <MonitorWindow />
                </div>
			</section>
		</>
	);
}

export default DashboardPage;
