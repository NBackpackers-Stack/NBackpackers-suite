import axios from 'axios';
import { API } from "@/constants/api";
import { defaultInventoryItems } from "@/public/inventory.data";

export const createInventory = async () => {
    try {
        console.log("reacher here in inventory service");

        const data = defaultInventoryItems
        const response = await axios.post(API.inventory, data);
        console.log("response", response);

        return response;
    } catch (error: any) {
        console.error("Error fetching inventory:", error.response?.data || error.message);
        throw error;
    }
};

export const getInventory = async (id?: string) => {
    try {
        console.log("reacher here in get inventory service");

        const response = await axios.get(API.getInventory, {
            params: { id }
        });
        console.log("response", response);

        return response.data;
    } catch (error: any) {
        console.error("Error fetching inventory:", error.response?.data || error.message);
        throw error;
    }
}


export const addItem = async (id: string, data: any) => {
    try {

        console.log("reacher here in add item service");

        const response = await axios.post(`${API.addItems}/${id}`, data);
        console.log("response", response);

        return response;
    } catch (error: any) {
        console.error("Error fetching inventory:", error.response?.data || error.message);
        throw error;
    }
}

export const addConsumption = async (data: any) => {
    try {
        console.log("reached here in add consumption service", data);

        const response = await axios.post(API.addConsumption, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("response", response);

        return response.data;
    } catch (error: any) {
        console.error("Error adding consumption:", error.response?.data || error.message);
        throw error;
    }
}

export const purchaseStock = async (data: any) => {
    try {
        console.log("reached here in purchase stock service", data);

        const response = await axios.post(API.purchaseStock, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("response", response);

        return response.data;
    } catch (error: any) {
        console.error("Error purchasing stock:", error.response?.data || error.message);
        throw error;
    }
}
