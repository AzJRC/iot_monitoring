import { useRef, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

import "./form.css";

export const Form = () => {
	const USER_REGEX = /^(?=.*[a-zA-Z])[a-zA-Z0-9&/$!]{4,25}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&/$!])[a-zA-Z0-9&/$!]{8,32}$/;

	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState("");
	const [validUser, setValidUser] = useState(false);

	const [pwd, setPwd] = useState("");
	const [validPwd, setValidPwd] = useState(false);

	const [againPwd, setAgainPwd] = useState("");
	const [validAgainPwd, setValidAginPwd] = useState(false);

	const [pwdMatch, setPwdMatch] = useState(false);

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

	/* Validate again password */
	useEffect(() => {
		const result = PWD_REGEX.test(againPwd);
		setValidAginPwd(result);
	}, [pwd]);

	/* Validate password match */
	useEffect(() => {
        const result = PWD_REGEX.test(pwd);
		setValidPwd(result);
		const match = pwd === againPwd;
		setPwdMatch(match);
	}, [pwd, againPwd]);

	useEffect(() => {
		setErrMsg("");
	}, [user, pwd]);

	return (
		<form className="login__form">
			<p ref={errRef} className={errMsg ? "show" : "hide"}>
				{errMsg}
			</p>
			<h1>New user</h1>
			<label className="login__form__label" htmlFor="username">
				{validUser ? (
					<FaCheck className="login__label__icon" />
				) : <RxCross1 className="login__label__icon" />}
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
				) : <RxCross1 className="login__label__icon" />}
				Password
			</label>
			<input
				className="login__form__input"
				type="password"
				id="password"
				required
				onChange={(e) => setPwd(e.target.value)}
			/>
			<label className="login__form__label" htmlFor="password_again">
				{(validAgainPwd && pwdMatch) ? (
					<FaCheck className="login__label__icon" />
				) : <RxCross1 className="login__label__icon" />}
				Password (again)
			</label>
			<input
				className="login__form__input"
				type="password"
				id="password_again"
				required
				onChange={(e) => setAgainPwd(e.target.value)}
			/>
		</form>
	);
};
