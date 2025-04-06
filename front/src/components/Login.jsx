import React, { useEffect, useState } from "react";
import "./Login.scss";
import logo from "../images/logo.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { request } from "../request";
import { LoggedIn } from "./LoggedIn";

const Login = ({ token, setToken }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showToken, setShowToken] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await request.post("/user/login", {
				email,
				password,
			});
			setToken(response.data);
			localStorage.setItem("token", response.data);
		} catch (error) {
			console.error("Registration failed:", error);
		}
	};

	useEffect(() => {
		if (token) {
			setShowToken(true);
		}
	}, [token]);

	const navigateToRegister = () => {
		navigate("/register");
	};

	const download_link = "https://bestscores.sandia.site/api/user/download";

	if (!showToken && !localStorage.getItem("token")) {
		return (
			<div className="login-container">
				<div className="login-form">
					<img src={logo} alt="BestScores Logo" className="logo" />
					<h2>Login</h2>
					<form onSubmit={handleSubmit}>
						<input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
						<input
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						/>
						<button type="submit">Login</button>
						<button
							onClick={navigateToRegister}
							style={{ marginTop: "10px", backgroundColor: "#2d7a4e" }}
						>
							Register
						</button>
					</form>
				</div>
			</div>
		);
	} else {
		return <LoggedIn token={token} />;
	}
};

export default Login;
