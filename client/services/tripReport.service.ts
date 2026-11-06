import axios from "axios";
import { API } from "@/constants/api";

export interface ITask {
    _id?: string;
    name: string;
    description: string;
    time: string;
    status: boolean;
    userRemark?: string;
    submittedAt?: string;
    firstImageUrl?: string;
    secondImageUrl?: string;
}

export interface IDayGroup {
    _id?: string;
    groupId?: string;
    date: string;
    tasks: ITask[];
}

export interface ITripReportItem {
    _id: string;
    tripName: string;
    tripDiscussion?: string;
    tripCoordinatorId?: string;
    tripDate?: string;
    groups?: IDayGroup[];
    createdAt?: string;
    updatedAt?: string;
}

export const tripReportService = {
    fetchTripsReport: async (): Promise<ITripReportItem[]> => {
        try {
            const response = await axios.get(API.getAllTrips);
            return response.data || [];
        } catch (error) {
            console.error("Error fetching trips for report:", error);
            throw error;
        }
    },
};

