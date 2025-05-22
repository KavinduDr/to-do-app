import { Request, Response, NextFunction } from "express";
import { createTask, deleteTask, getAllTasksByUserId, getTaksById,  toggleTaskCompletion,  updateTask } from "../services/task.service";

// create a new task
export const createTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await createTask(req.body);
        console.log(task);
        res.status(201).json({
            success: true,
            task,
        });
    }catch (error) {
        next(error);
    }
};

// get a task by id
export const getTaskByIdController = async (req: Request, res: Response, next: NextFunction) => {
    const task = await getTaksById(req.params.id);
    res.status(200).json({
        success: true,
        task,
    });
};

// update task by id
export const updateTaskByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedTask = await updateTask(req.params.id, req.body);
        res.status(204).json({
            success: true,
            updateTask: updatedTask,
        });

    } catch (error) {
        next(error);
    }
};

// delete task by id
export const deleteTaskController = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        await deleteTask(req.params.id);
        res.status(204).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

// get all tasks for a user
export const getAllTasksByUserIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await getAllTasksByUserId(req.params.id);
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

// get all finished tasks for a user

export const getAllFinishedTasksByUserIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = (await getAllTasksByUserId(req.params.id)).filter((task) => task.completed);
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

// get all unfinished tasks for a user
export const getAllUnfinishedTasksByUserIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = (await getAllTasksByUserId(req.params.id)).filter((task) => !task.completed);
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

// toggle completion of tasks
export const toggleTaskCompletionController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await toggleTaskCompletion(req.params.id);
        res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        next(error);
    }
};
