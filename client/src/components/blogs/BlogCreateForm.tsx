import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router-dom";
interface Props {}

const BlogCreateForm = (props: Props) => {
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		image: null,
	});

	const { mutate, isSuccess, data } = useMutation((blogData: any) => {
		return axios.post(`http://localhost:5000/api/blogs`, blogData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
	});

	const handleChange = (e: any) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev: any) => ({
			...prev,
			image: e.target.files![0],
		}));
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		mutate(formData);
	};

	if (isSuccess) {
		return <Navigate to={`/blogs/${(data as any)!._id}`} />;
	}

	return (
		<div>
			<h1>Create Blog</h1>
			<form onSubmit={handleSubmit} encType='multipart/form-data'>
				<div>
					<label>Title</label>
					<input
						type='text'
						name='title'
						value={formData.title}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Content</label>
					<textarea
						name='content'
						value={formData.content}
						onChange={handleChange}
						cols={30}
						rows={10}
					></textarea>
				</div>
				<div>
					<label></label>
					<input
						type='file'
						name='image'
						onChange={handleFileChange}
					/>
				</div>
				<button type='submit'>Create Blog</button>
			</form>
		</div>
	);
};

export default BlogCreateForm;
