"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExpressError extends Error {
    constructor(message, status) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message || "Something went wrong. Please try again.";
        this.status = status || 500;
    }
}
exports.default = ExpressError;
//# sourceMappingURL=ExpressError.js.map