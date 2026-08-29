import { useState } from "react";
import Signup from "@/services/signup.services";
import type { SignupFormData } from "@/services/signup.services";

export default function useSignUp() {
    const [formData, setFormData] = useState<SignupFormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");

            return;
        }
        const response = await Signup(formData);

    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
}
