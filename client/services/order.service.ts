import axios from "axios";
import { API } from "@/constants/api";

export interface OrderItemPayload {
    itemName: string;
    category: string;
    price: number;
    isMrp?: boolean;
    quantity: number;
    subtotal: number;
}

export interface CreateOrderPayload {
    cafeName?: string;
    customerName: string;
    customerNumber: string;
    notes?: string;
    items: OrderItemPayload[];
    totalPrice: number;
    totalUnits: number;
}

export interface OrderApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

/**
 * Sends a new cafe order to the backend service.
 */
export const createOrder = async (
    orderData: CreateOrderPayload
): Promise<OrderApiResponse> => {
    try {
        console.log("oder Data", orderData);

        const response = await axios.post<OrderApiResponse>(API.createOrder, orderData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const serverError = error.response?.data;
            console.error("Error in createOrder service:", serverError || error.message);
            throw serverError || error;
        }
        console.error("Unexpected error in createOrder service:", error);
        throw error;
    }
};
