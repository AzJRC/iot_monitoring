import { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../../contexts/AuthProvider";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import "./login.css";
import { SERVER_URL } from "../../api/backend_api";

const LOGIN_URL = '/auth';

export const LoginForm = () => {
	const { setAuth } = useContext(AuthContext);

	const USER_REGEX = /^(?=.*[a-zA-Z])[a-zA-Z0-9&/$!]{4,25}$/;
	const PWD_REGEX = /^[a-z]{4,32}$/;

	//	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&/$!])[a-zA-Z0-9&/$!]{8,32}$/;

	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState("");
	const [validUser, setValidUser] = useState(false);

	const [pwd, setPwd] = useState("");
	const [validPwd, setValidPwd] = useState(false);

	const [errMsg, setErrMsg] = useState(false);
	const [success, setSuccess] = useState(false);

	const [pwdInputSelected, setPwdInputSelected] = useState(false);
	const [pwdInputUnselected, setPwdInputUnselected] = useState(false);

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
		setErrMsg("");
	}, [user, pwd]);


	/* Haddle submit of user registration */
	const handleSubmit = async (e) => {
		e.preventDefault();

		const userCredentials = { user, pwd };

		fetch(SERVER_URL + LOGIN_URL, {
			method: "POST",
			body: JSON.stringify(userCredentials),
			headers: {
				"Content-Type": "application/json",
			},
			credentials: 'include'
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response)
				const accessToken = response?.data?.accessToken;
				const roles = response?.data?.roles;
				console.log(accessToken, roles)
				// setAuth({
				// 	user,
				// 	pwd,
				// 	roles,
				// 	accessToken
				// });

				setSuccess(true);
			})
			.catch((err) => {
				console.log("Error: ", err);
			});

	};

	return (
		<>
			{success ? (
				<section>
					<h1>Sucessful login</h1>
				</section>
			) : (
				<form className="login__form" onSubmit={handleSubmit}>
					<p ref={errRef} className={errMsg ? "show" : "hide"}>
						{errMsg}
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
			)}
		</>
	);
};
