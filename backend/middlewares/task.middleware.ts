import {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import { ErrorHandler } from '../utils/ErrorHandler';
import TaskModel from '../models/task.model';

// check task is available
export const checkTaskExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return next(new ErrorHandler(400, 'Invalid task ID'));
        }

        const task = await TaskModel.findById(id);

        if (!task) {
            return next(new ErrorHandler(404, 'Task not found'));
        }
        req.task = task;
        next();
    } catch (error) {
        next(new ErrorHandler(500, 'Internal server error'));
    }
}

export const errorMiddleware = (err: ErrorHandler | Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err instanceof ErrorHandler ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
    });
}