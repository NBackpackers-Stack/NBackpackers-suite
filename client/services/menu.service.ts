import axios from "axios";
import { API } from "@/constants/api";

export interface MenuItemPayload {
    category: string;
    item: string;
    price: string;
    isAvailable?: boolean;
}

export interface CreateMenuPayload {
    cafeName?: string;
    items: MenuItemPayload[];
}

export interface MenuApiResponse {
    success: boolean;
    message?: string;
    count?: number;
    data?: any;
    error?: string;
}

/**
 * Creates or updates cafe menu by sending an array of menu objects or a payload with cafeName & items
 */
export const createMenu = async (
    data: MenuItemPayload[] | CreateMenuPayload
): Promise<MenuApiResponse> => {
    try {
        const response = await axios.post<MenuApiResponse>(API.createMenu, data);
        return response.data;
    } catch (error: any) {
        console.error("Error in createMenu service:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

/**
 * Fetches the latest menu for the cafe
 */
export const getMenu = async (cafeName?: string): Promise<MenuApiResponse> => {
    try {
        const response = await axios.get<MenuApiResponse>(API.getMenu, {
            params: cafeName ? { cafeName } : undefined,
        });
        return response.data;
    } catch (error: any) {
        console.error("Error in getMenu service:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};
