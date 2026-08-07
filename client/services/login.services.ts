import { resolve } from "path";
import axios from 'axios'
import { API } from "@/constants/api"

export default async function Login(data: any) {
    try {

        const response = await axios.post(API.login, data)

        //console.log("Login respoonse", response);

    } catch (error: any) {
        //console.error("error", error.response?.data)
        return error
    }
}