import { API } from "@/constants/api";
import axios from "axios";

export type SignupFormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

type SignupRequestData = Omit<SignupFormData, "confirmPassword">;

export default async function Signup(data: SignupFormData) {

    console.log("reached in signup page");
    
    try {
        console.log("-------",`${API.signup}`);

        const signupData: SignupRequestData = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        const response = await axios.post(`${API.signup}`, signupData);

        console.log("Sigu up response", response);

        return response;

    } catch (error) {
        console.log("Error", error);
        return error;
    }
}
