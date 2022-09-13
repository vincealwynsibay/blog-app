import React from "react";
import { Link } from "react-router-dom";

interface Props {
	blog: any;
}

const BlogItem = ({ blog }: Props) => {
	return (
		<div>
			<Link to={`/blogs/${blog._id}`}>
				<h1>{blog.title}</h1>
				<p>{blog.content}</p>
			</Link>
		</div>
	);
};

export default BlogItem;
