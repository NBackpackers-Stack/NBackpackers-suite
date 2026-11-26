import axios from "axios";
import { API } from "@/constants/api";

export type OrderStatus = "pending" | "preparing" | "ready" | "completed" | "cancelled";
export type PaymentStatus = "unpaid" | "paid";

export interface OrderItemPayload {
    _id?: string;
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

export interface OrderRecord {
    _id: string;
    cafeName: string;
    customerName: string;
    customerNumber: string;
    notes?: string;
    items: OrderItemPayload[];
    totalPrice: number;
    totalUnits: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: string;
    updatedAt: string;
}

export interface GetOrdersParams {
    cafeName?: string;
    page?: number;
    limit?: number;
    status?: string;
}

export interface OrderApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

export interface GetOrdersApiResponse {
    success: boolean;
    message?: string;
    data: OrderRecord[];
    total?: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
    error?: string;
}

/**
 * Sends a new cafe order to the backend service.
 */
export const createOrder = async (
    orderData: CreateOrderPayload
): Promise<OrderApiResponse> => {
    try {
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

/**
 * Fetches paginated cafe orders (default 10 at a time) with cache-busting headers.
 */
export const getOrders = async (
    params: GetOrdersParams = {}
): Promise<GetOrdersApiResponse> => {
    try {
        const response = await axios.get<GetOrdersApiResponse>(API.getOrders, {
            params: {
                ...params,
                _t: Date.now(),
            },
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                Expires: "0",
            },
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const serverError = error.response?.data;
            console.error("Error in getOrders service:", serverError || error.message);
            throw serverError || error;
        }
        console.error("Unexpected error in getOrders service:", error);
        throw error;
    }
};
