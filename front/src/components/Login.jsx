import React, { useEffect, useState } from "react";
import "./Login.scss";
import logo from "../images/logo.png";
import { useSearchParams } from "react-router-dom";
import { request } from "../request";
import { LoggedIn } from "./LoggedIn";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [token, setToken] = useState("");
	const [showToken, setShowToken] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await request.post("/user/login", {
				email,
				password,
			});
			setToken(response.data);
			localStorage.setItem("token", token);
		} catch (error) {
			console.error("Registration failed:", error);
		}
	};

	useEffect(() => {
		if (token) {
			setShowToken(true);
		}
	}, [token]);

	const download_link = "https://bestscores.sandia.site/api/user/download";

	return (
		<div className="login-form">
			<img src={logo} alt="BestScores Logo" className="logo" />
			{!showToken && !localStorage.getItem("token") ? (
				<>
					<h2>Login</h2>
					<form onSubmit={handleSubmit}>
						<input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
						<input
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						/>
						<button type="submit">Login</button>
					</form>
				</>
			) : (
          <LoggedIn token={token} />
			)}
		</div>
	);
};

export default Login;
