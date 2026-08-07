import { useState } from "react";
import { addItem } from "@/services/inventory.services";
export const useAddItem = (id: string) => {
    const [formData, setFormData] = useState({
        item_name: '',
        item_id: '',
        unit: '',
        quantity: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting:', formData);

        const res = await addItem(id, formData);
        console.log("ress for add items", res);

        if (res) {
            alert("Form submitted!");
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit
    };
}   