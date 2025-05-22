import { ITask } from "../models/task.model";
import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            task?: ITask
        }
    }
}