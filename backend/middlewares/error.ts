import { NextFunction, Request, Response } from "express";
import {ErrorHandler} from "../utils/ErrorHandler";

export const ErrorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // incorrect mongodb id
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(400, message);
    }

    // duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(400, message);
    }

    // incorrect jwt
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid jwt token. Please log in again.";
        err = new ErrorHandler(401, message);
    }

    // expired jwt
    if (err.name === "TokenExpiredError") {
        const message = "Expired jwt token. Please log in again.";
        err = new ErrorHandler(401, message);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}