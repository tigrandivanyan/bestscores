import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.scss";

const App = () => {
	return (
		<div className="app">
			{!localStorage.getItem("token") ? (
				<nav className="nav">
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</nav>
			) : (
				""
			)}

			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
};

export default App;
