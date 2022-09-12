import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Props {}

const Register = (props: Props) => {
	const [formData, setFormData] = useState({
		email: "",
		name: "",
		password: "",
	});
	const { mutate, error, isLoading, data } = useMutation(
		(credentials: any) => {
			return axios.post(
				"http://localhost:5000/api/auth/register",
				credentials,
				{
					withCredentials: true,
				}
			);
		}
	);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		mutate(formData);
	};

	return (
		<div>
			<h1>Register</h1>
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
					<label>Name</label>
					<input
						type='text'
						name='name'
						onChange={handleChange}
						value={formData.name}
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
					Already have an account? <Link to='/login'>Login</Link>
				</p>
				<p>{error ? (error as any).response.data : ""}</p>

				{!isLoading ? (
					<button type='submit'>Register</button>
				) : (
					<button type='submit' disabled>
						loading...
					</button>
				)}
			</form>
		</div>
	);
};

export default Register;
