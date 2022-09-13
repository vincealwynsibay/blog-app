import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BlogItem from "./BlogItem";

interface Props {}

const BlogList = (props: Props) => {
	// const { data, isSuccess, isLoading } = useQuery(["blogs"], () => {
	// 	axios.get("http://localhost:5000/api/blogs").then((res) => res.data);
	// });
	const { data, isSuccess, isLoading } = useQuery(["blogs"], () => {
		return axios
			.get("http://localhost:5000/api/blogs")
			.then((res) => res.data);
	});

	if (isLoading) {
		return <div>"loading..."</div>;
	}

	console.log(data);

	return (
		<div>
			<h1>Blogs</h1>
			<div>
				{data.blogs.map((blog: any) => (
					<BlogItem key={blog._id} blog={blog} />
				))}
			</div>
		</div>
	);
};

export default BlogList;
