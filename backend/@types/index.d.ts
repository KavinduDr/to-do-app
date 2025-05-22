import { ITask } from "../models/task.model";

declare global {
    namespace Express {
        interface Request {
            task?: ITask
        }
    }
}