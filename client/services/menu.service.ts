import axios from "axios";
import { API } from "@/constants/api";

export interface MenuItemPayload {
    _id?: string;
    category: string;
    item: string;
    price: string;
    isAvailable?: boolean;
}

export interface CreateMenuPayload {
    cafeName?: string;
    items: MenuItemPayload[];
}

export interface AddMenuItemPayload {
    category: string;
    item: string;
    price: string;
    isAvailable?: boolean;
    cafeName?: string;
}

export interface EditMenuItemPayload {
    itemId?: string;
    oldItemName?: string;
    category: string;
    item: string;
    price: string;
    isAvailable?: boolean;
    cafeName?: string;
}

export interface DeleteMenuItemPayload {
    itemId?: string;
    itemName?: string;
    cafeName?: string;
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

/**
 * Adds a single new menu item to the cafe menu
 */
export const addMenuItem = async (
    itemData: AddMenuItemPayload
): Promise<MenuApiResponse> => {
    try {
        const response = await axios.post<MenuApiResponse>(API.addMenuItem, itemData);
        return response.data;
    } catch (error: any) {
        console.error("Error in addMenuItem service:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

/**
 * Edits an existing menu item in the cafe menu
 */
export const editMenuItem = async (
    itemData: EditMenuItemPayload
): Promise<MenuApiResponse> => {
    try {
        const response = await axios.put<MenuApiResponse>(API.editMenuItem, itemData);
        return response.data;
    } catch (error: any) {
        console.error("Error in editMenuItem service:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

/**
 * Deletes a menu item by id or name from the cafe menu
 */
export const deleteMenuItem = async (
    deleteData: DeleteMenuItemPayload
): Promise<MenuApiResponse> => {
    try {
        const response = await axios.delete<MenuApiResponse>(API.deleteMenuItem, {
            params: deleteData,
            data: deleteData,
        });
        return response.data;
    } catch (error: any) {
        console.error("Error in deleteMenuItem service:", error.response?.data || error.message);
        throw error.response?.data || error;
    }
};
