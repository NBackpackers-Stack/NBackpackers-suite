import axios from 'axios';
import { API } from '../constants/api';

export const submitFeedback = async (data: { 
    message: string; 
    name: string;
    number: string;
    batchNumber?: string;
    email: string;
    ratingTaste: number;
    ratingFreshness: number;
    ratingQuality: number;
    ratingPortion: number;
    ratingOverall: number;
    image?: File | string | null 
}) => {
    try {
        console.log("arrived in the QR code services", data);

        // Convert the standard object into FormData for multipart/form-data support
        const formData = new FormData();
        formData.append("message", data.message);
        formData.append("name", data.name);
        formData.append("number", data.number);
        if (data.batchNumber) {
            formData.append("batchNumber", data.batchNumber);
        }
        formData.append("email", data.email);
        formData.append("ratingTaste", String(data.ratingTaste));
        formData.append("ratingFreshness", String(data.ratingFreshness));
        formData.append("ratingQuality", String(data.ratingQuality));
        formData.append("ratingPortion", String(data.ratingPortion));
        formData.append("ratingOverall", String(data.ratingOverall));

        // Append the image only if it exists
        if (data.image) {
            formData.append("image", data.image);
        }

        // Axios handles the multipart/form-data headers automatically when you pass a FormData instance
        const response = await axios.post(API.feedback, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error submitting feedback:", error);
        throw error.response?.data || error.message;
    }
};

export const getFeedback = async () => {
    try {
        const response = await axios.get(API.feedback);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching feedback:", error);
        throw error.response?.data || error.message;
    }
};
