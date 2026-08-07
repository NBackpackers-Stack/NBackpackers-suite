import react from "react"
import axios from "axios"
import { API } from "@/constants/api"


export default async function Signup(data: any) {

    try {
        const response = await axios.post(`${API.signup}`, data);

        console.log("Sigu up response", response);

        return response;

    } catch (error) {
        console.log("Error", error);
        return error;
    }
}