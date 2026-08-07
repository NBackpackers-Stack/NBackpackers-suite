import { useState } from "react";
import Login from "@/services/login.services"

export default function useLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        }
        )
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (formData.email == null && formData.password == null) {

            alert(" Please fill all the blanks")
            return;
        }

        const response = await Login(formData);
    };

    return {
        formData,
        handleChange,
        handleSubmit
    }

}