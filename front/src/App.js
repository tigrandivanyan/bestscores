import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.scss";

const App = () => {
	const [token, setToken] = useState("");

	return (
		<div className="app">

			<Routes>
				<Route path="/" element={<Login token={token} setToken={setToken} />} />
				<Route path="/register" element={<Register token={token} setToken={setToken}/>} />
			</Routes>
		</div>
	);
};

export default App;
