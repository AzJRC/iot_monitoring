import useAuth from "./../../hooks/useAuth";
import { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { SERVER_URL } from "../../api/backend_api";
import "./login.css";

const LOGIN_URL = '/auth';

const LoginForm = () => {
	const { setAuth } = useAuth();
	const location = useLocation()
	const navigate = useNavigate();
	const from = location?.state?.from?.pathname || '/login'

	const USER_REGEX = /^(?=.*[a-zA-Z])[a-zA-Z0-9&/$!]{4,25}$/;
	const PWD_REGEX = /^[a-z][a-zA-Z0-9&/$!]{4,32}$/;

	//	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&/$!])[a-zA-Z0-9&/$!]{8,32}$/;

	const userRef = useRef();

	const [user, setUser] = useState("");
	const [validUser, setValidUser] = useState(false);

	const [pwd, setPwd] = useState("");
	const [validPwd, setValidPwd] = useState(false);

	const [errorMsg, setErrorMsg] = useState("");
	const [error, setError] = useState(false);

	/* Effect on load */
	useEffect(() => {
		userRef.current.focus();
	}, []);

	/* Validate user */
	useEffect(() => {
		const result = USER_REGEX.test(user);
		setValidUser(result);
	}, [user]);

	/* Validate password */
	useEffect(() => {
		const result = PWD_REGEX.test(pwd);
		setValidPwd(result);
	}, [pwd]);

	useEffect(() => {
		setError("");
	}, [user, pwd]);


	/* Haddle submit of user registration */
	const handleSubmit = async (e) => {
		e.preventDefault();

		const userCredentials = { user, pwd };
		try {
			const response = await fetch(SERVER_URL + LOGIN_URL, {
				method: "POST",
				body: JSON.stringify(userCredentials),
				headers: {
					"Content-Type": "application/json",
				},
				credentials: 'include'
			});

			if (response.status === 200) {
				const res = await response.json();
				const accessToken = res?.data?.accessToken;
				const roles = res?.data?.roles;

				setAuth({
					user,
					pwd,
					roles,
					accessToken
				});

				navigate(from, { replace: true });
			} else if (response.status === 401) {
				throw new Error('Username or password incorrect.');
			} else {
				throw new Error('Unknown error.')
			}

		} catch (err) {
			console.log(err);
			setErrorMsg("Incorrect username or password");
			setError(true);
		}

	};

	return (
		<form className="login__form" onSubmit={handleSubmit}>
			<p className={`login__error-msg ${error ? "show" : "hide"}`}>
				{errorMsg}
			</p>

			<h1>Login</h1>
			<label className="login__form__label" htmlFor="username">
				{validUser ? (
					<FaCheck className="login__label__icon" />
				) : (
					<RxCross1 className="login__label__icon" />
				)}
				Username
			</label>
			<input
				ref={userRef}
				className="login__form__input"
				type="text"
				id="username"
				required
				onChange={(e) => setUser(e.target.value)}
			/>

			<label className="login__form__label" htmlFor="password">
				{validPwd ? (
					<FaCheck className="login__label__icon" />
				) : (
					<RxCross1 className="login__label__icon" />
				)}
				Password
			</label>
			<input
				className="login__form__input"
				type="password"
				id="password"
				required
				onChange={(e) => setPwd(e.target.value)}
			/>
			
			<button
				className="form__btn"
				disabled={(validUser && validPwd) ?
					false :
					true}
			>
				Log in
			</button>
		</form>
	);
};

export default LoginForm;