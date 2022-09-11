"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const db_1 = __importDefault(require("./config/db"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
const { createClient } = require("redis");
const app = (0, express_1.default)();
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);
app.use((0, express_session_1.default)({
    name: "qid",
    store: new RedisStore({ client: redisClient }),
    cookie: {
        httpOnly: true,
        secure: constants_1.__prod__,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        sameSite: "lax",
    },
    saveUninitialized: false,
    secret: process.env.REDIS_SECRET,
    resave: false,
}));
app.use((0, cors_1.default)({
    origin: constants_1.__prod__ ? "" : "http://localhost:3000",
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
(0, db_1.default)();
app.get("/ping", (_req, res) => {
    res.json("ping");
});
app.use("/api/auth", authRoute_1.default);
app.use((err, _req, res, _next) => {
    return res.status(err.status || 500).json({ error: err.message });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[server] Server running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map