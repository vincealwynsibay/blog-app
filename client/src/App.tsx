import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Register from "./components/auth/Register";
import Blog from "./components/blogs/Blog";
import BlogCreateForm from "./components/blogs/BlogCreateForm";
import BlogEditForm from "./components/blogs/BlogEditForm";
import BlogList from "./components/blogs/BlogList";
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
						// Blogs
						<Route path='/blogs/:id' element={<Blog />} />
						<Route path='/blogs' element={<BlogList />} />
						// todo create form
						<Route
							path='/blogs/create'
							element={
								<ProtectedRoute>
									<BlogCreateForm />
								</ProtectedRoute>
							}
						/>
						// todo edit form
						<Route
							path='/blogs/:id/edit'
							element={
								<ProtectedRoute>
									<BlogEditForm />
								</ProtectedRoute>
							}
						></Route>
						// auth
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
