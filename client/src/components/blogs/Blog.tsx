import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

interface Props {}

const Blog = (props: Props) => {
	let { id } = useParams();
	const { data, isLoading } = useQuery(["blog"], () => {
		return axios
			.get(`http://localhost:5000/api/blogs/${id}`)
			.then((res) => res.data);
	});

	if (isLoading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h1>{data.blog.title}</h1>
			<p>{data.blog.content}</p>
			{data.blog.image && <img src={data.blog.image} />}
		</div>
	);
};

export default Blog;
