import mongoose, {Document, Model, Schema} from "mongoose";

export interface ITask extends Document {
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema<ITask> = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

const TaskModel: Model<ITask> = mongoose.model("Task", taskSchema);

export default TaskModel;
