import React, { useState, useRef, useEffect } from "react";
import useAuth from "./../../hooks/useAuth";
import Navbar from "../Navbar/Navbar";
import Window from "../Window/Window";
import { SERVER_URL } from "../../api/backend_api";
import "./configuration_page.css";

function DashboardPage() {
	const { auth } = useAuth();

	const [topic, setTopic] = useState("");
	const [isFormWindowOpen, setIsFormWindowOpen] = useState(false);
    const [subscriptions, setSubscriptions] = useState([""]);

	const addHostBtnRef = useRef(null);


    // functions
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
        .then((response) => Promise.all([response.json(), response.status]))
        .then(([data, statusCode]) => {
            console.log(data);
            console.log(statusCode);
            setSubscriptions([...subscriptions, topic])
        })
        .catch((error) => {
            console.error("Error:", error.message);
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
        .then((response) => Promise.all([response.json(), response.status]))
        .then(([data, statusCode]) => {
            console.log(data);
            console.log(statusCode);
        })
        .catch((error) => {
            console.error("Error:", error.message);
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
        fetch(SERVER_URL + "/devices", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth.accessToken,
            },
        })
        .then((response) => Promise.all([response.json(), response.status]))
        .then(([data, statusCode]) => {
            console.log(subscriptions)
            setSubscriptions([data.subscriptions])
        })
        .catch((error) => {
            console.error("Error:", error.message);
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
							inputOnChange={setTopic}
							subscribeOnClick={handleSubscription}
							unsubscribeOnClick={handleUnsubscription}
						/>
					}
				/>
			)}
			<section>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {subscriptions && subscriptions.map((subscription, index) => (
                    <p key={index}>{subscription}</p>
                ))}
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
