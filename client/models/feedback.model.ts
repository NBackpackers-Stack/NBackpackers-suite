import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    batchNumber: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    ratingTaste: {
        type: Number,
        required: true,
    },
    ratingFreshness: {
        type: Number,
        required: true,
    },
    ratingQuality: {
        type: Number,
        required: true,
    },
    ratingPortion: {
        type: Number,
        required: true,
    },
    ratingOverall: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const FeedbackModel = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default FeedbackModel;
