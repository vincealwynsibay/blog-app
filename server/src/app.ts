import { __prod__ } from "./constants";
import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import session from "express-session";
import connectRedis from "connect-redis";
import connectDB from "./config/db";
import authRoute from "./routes/authRoute";
const RedisStore = connectRedis(session);

// redis@v4
const { createClient } = require("redis");

const app = express();

// configure redis
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

app.use(
	session({
		name: "qid",
		store: new RedisStore({ client: redisClient }),
		cookie: {
			httpOnly: true,
			secure: __prod__,
			maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
			sameSite: "lax",
		},
		saveUninitialized: false,
		secret: process.env.REDIS_SECRET!,
		resave: false,
	})
);

app.use(
	cors({
		origin: __prod__ ? "" : "http://localhost:3000",
		credentials: true,
	})
);

app.use(morgan("dev"));
app.use(bodyParser.json());

// run db
connectDB();

app.get("/ping", (_req, res) => {
	res.json("ping");
});

app.use("/api/auth", authRoute);

// error handler
app.use((err: any, _req: Request, res: Response, _next: any) => {
	return res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`[server] Server running on port ${PORT}`);
});
