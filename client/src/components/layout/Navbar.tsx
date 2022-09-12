import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { logout } from "../../features/userSlice";
interface Props {}

const Navbar = (props: Props) => {
	const user: any = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();
	const handleLogout = async () => {
		await axios.get("http://localhost:5000/api/auth/logout", {
			method: "GET",
			withCredentials: true,
		});

		dispatch(logout());
	};

	return (
		<nav>
			{user ? (
				<>
					<a onClick={handleLogout}>Logout</a>
					<p>{user.name!}</p>
				</>
			) : (
				<>
					<Link to='/login'>Login</Link>
					<Link to='/register'>Sign Up</Link>
				</>
			)}
		</nav>
	);
};

export default Navbar;
