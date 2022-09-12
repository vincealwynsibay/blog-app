import express, { NextFunction, Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import ExpressError from "../lib/ExpressError";
const router = express.Router();

// login
router.post(
	"/login",
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;
		try {
			// check if required input is inputted
			if (!email || !password) {
				throw new ExpressError("Invalid email or password", 401);
			}

			let user = await User.findOne({ email });

			// check if user exists
			if (!user) {
				throw new ExpressError("User not found", 401);
			}

			// check if password is valid
			const isValid = await bcrypt.compare(password, user.password);

			if (!isValid) {
				throw new ExpressError("Invalid email or password", 401);
			}

			// send session to client
			req.session.userId = user._id as any;
			console.log(req.session);

			// return user details
			return res.json({ ok: true, user });
		} catch (err) {
			next(err);
		}
	}
);

// register
router.post(
	"/register",
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password, name } = req.body;
		try {
			// check if required input is inputted
			if (!email || !password || !name) {
				throw new ExpressError("Invalid Credentials", 401);
			}

			let user = await User.findOne({ email });

			if (user) {
				throw new ExpressError("Email already taken", 401);
			}

			// encrypt password
			const salt = await bcrypt.genSalt(10);
			const encryptedPassword = await bcrypt.hash(password, salt);

			user = new User({
				email,
				name,
				password: encryptedPassword,
			});

			// save user
			await user.save();

			return res.json({ ok: true });
		} catch (err) {
			next(err);
		}
	}
);

// me
router.get("/me", async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.session.userId) {
			return res.json({ user: null });
		}
		const user = await User.findById(req.session.userId);
		return res.json({ user });
	} catch (err) {
		next(err);
	}
});
router.get(
	"/logout",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			req.session.destroy(() => {
				res.clearCookie("qid", {
					path: "/",
					domain: "localhost",
				});
				return res.send({ clearSession: "success" });
			});
		} catch (err) {
			next(err);
		}
	}
);

export default router;
