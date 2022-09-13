import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { RootState } from "../../app/store";
interface Props {
	children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
	const user = useSelector((state: RootState) => state.user.user);

	return <div>{user ? children : ""}</div>;
};

export default ProtectedRoute;
