import TaskModel, { ITask } from "../models/task.model";

export const createTask = async (taskData: ITask): Promise<ITask> => {
    const task = new TaskModel(taskData);
    return await task.save();
};

export const getTaksById = async (id: string): Promise<ITask | null> => {
    return await TaskModel.findById(id);
};

export const updateTask= async (id: string, taskData: Partial<ITask>): Promise<ITask | null> => {
    return await TaskModel.findByIdAndUpdate(
        id,
        { $set: taskData },
        { new: true, runValidators: true }
    );
};

export const deleteTask = async (id: string): Promise<boolean> => {
    await TaskModel.findByIdAndDelete(id);
    return true;
};

export const getAllTasksByUserId = async (userId: string): Promise<ITask[]> => {
    return await TaskModel.find({ userId }).sort({ createdAt: -1 });
};

export const getFinishedTasksByUserId = async (userId: string): Promise<ITask[]> => {
    return await TaskModel.find({ userId, isFinished: true }).sort({ dueDate: 1, dueTime: 1 });
};

export const getUnfinishedTasksByUserId = async (userId: string): Promise<ITask[]> => {
    return await TaskModel.find({ userId, isFinished: false }).sort({ dueDate: 1, dueTime: 1 });
};

export const toggleTaskCompletion = async (id: string): Promise<ITask | null> => {
    const task = await TaskModel.findById(id);
    if (!task) {
        return null;
    }
    task.completed = !task.completed;
    return await task.save();
}