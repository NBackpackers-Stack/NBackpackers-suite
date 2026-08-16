import { API } from "@/constants/api";
import axios from "axios";


export default async function Signup(data: any) {

    console.log("reached in signup page");
    
    try {
        console.log("-------",`${API.signup}`);
        
        const response = await axios.post(`${API.signup}`, data);

        console.log("Sigu up response", response);

        return response;

    } catch (error) {
        console.log("Error", error);
        return error;
    }
}