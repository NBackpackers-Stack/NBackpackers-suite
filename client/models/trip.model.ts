import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    time: {
        type: String,
        required: [true, "Time is required"],
    },
    status: {
        type: Boolean,
        default: false,
    },
    userRemark: {
        type: String,
        default: "",
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

const daysSchema = new mongoose.Schema({
    groupId: {
        type: String,
        //required: [true, "Group ID is required"],
    },
    date: {
        type: String,
        required: [true, "Date is required"],
    },
    tasks: [taskSchema],
})



const tripSchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: [true, "Name is required"],
    },
    tripDiscussion: {
        type: String,
        required: [true, "Discussion is required"],
    },
    tripCoordinatorId: {
        type: "String",
        //required: [true, "Who will be the coordinator"],
    },
    tripDate: {
        type: String,
        //required: [true, "Duration is mendatory"]
    },
    groups: [daysSchema],
})

const TripModel = mongoose.models.Trip || mongoose.model("Trip", tripSchema);

export default TripModel;
