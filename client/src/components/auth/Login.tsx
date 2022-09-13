import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../features/userSlice";
import axios from "axios";
interface Props {}

const Login = (props: Props) => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const { mutate, error, isLoading, data, isSuccess } = useMutation(
		(credentials: any) => {
			return axios.post(
				"http://localhost:5000/api/auth/login",
				credentials,
				{
					withCredentials: true,
				}
			);
		}
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isSuccess) {
			dispatch(login(data.data));
		}
	}, [isSuccess]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate(formData);
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email</label>
					<input
						type='email'
						name='email'
						onChange={handleChange}
						value={formData.email}
					/>
				</div>
				<div>
					<label>Password</label>
					<input
						type='password'
						name='password'
						onChange={handleChange}
						value={formData.password}
					/>
				</div>

				<p>
					Don't have an account yet?{" "}
					<Link to='/register'>Register</Link>
				</p>

				<p>{error ? (error as any).response.data.error : ""}</p>

				{!isLoading ? (
					<button type='submit'>Login</button>
				) : (
					<button type='submit' disabled>
						loading...
					</button>
				)}
			</form>
		</div>
	);
};

export default Login;
