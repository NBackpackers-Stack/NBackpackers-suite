import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
    },
    time: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "done", "raise"],
        default: "pending",
    },
    submittedAt: {
        type: String,
        default: "",
    },
    firstImageUrl: {
        type: String,
        default: "",
    },
    secondImageUrl: {
        type: String,
        default: "",
    },

})

const daySchema = new mongoose.Schema({
    date: {
        type: String,
    },
    month: {
        type: String,
    },
    tasks: [taskSchema],
})


const TaskModel = mongoose.models.Task || mongoose.model("Task", daySchema);

export default TaskModel;