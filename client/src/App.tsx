import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/Navbar";
import { initializeAuth } from "./features/userSlice";
interface Props {}

const App = (props: Props) => {
	const dispatch = useDispatch();
	const { data, isSuccess, isLoading } = useQuery(["user"], () =>
		axios
			.get("http://localhost:5000/api/auth/me", {
				withCredentials: true,
			})
			.then((res) => res.data)
	);

	useEffect(() => {
		if (isSuccess) {
			dispatch(initializeAuth(data));
		}
	}, [isSuccess]);
	return (
		<>
			{!isLoading ? (
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path='/' element={<div>home</div>} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='*' element={<div>not found</div>} />
					</Routes>
				</BrowserRouter>
			) : (
				""
			)}
		</>
	);
};

export default App;
