import express from 'express';
import { checkTaskExists } from '../middlewares/task.middleware';
import { createTaskController, deleteTaskController, getAllFinishedTasksByUserIdController, getAllTasksByUserIdController, getAllUnfinishedTasksByUserIdController, getTaskByIdController, updateTaskByIdController, toggleTaskCompletionController } from '../controllers/task.controller';
// import { toggleTaskCompletion } from '../services/task.service';

const taskRouter = express.Router();

// create new task
taskRouter.post('/task/create', createTaskController);

// get a task by id
taskRouter.get('/task/:id', checkTaskExists, getTaskByIdController);

// update a task by id
taskRouter.put('/task/:id', checkTaskExists, updateTaskByIdController);

// delete a task by id
taskRouter.delete('/task/:id', checkTaskExists, deleteTaskController);

// get all tasks for a user
taskRouter.get('/task/all/:id', getAllTasksByUserIdController);

// get all finihed tasks for a user
taskRouter.get('/task/finished/:id', getAllFinishedTasksByUserIdController);

// get all unfinished tasks for a user
taskRouter.get('/task/unfinished/:id', getAllUnfinishedTasksByUserIdController);

// toggle completion status
taskRouter.get('/task/toggle/:id', checkTaskExists, toggleTaskCompletionController);

export default taskRouter;