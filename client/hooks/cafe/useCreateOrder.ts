"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCafeCart } from "@/hooks/cafe/useCafeCart";
import { createOrder, CreateOrderPayload } from "@/services/order.service";

export interface UseCreateOrderReturn {
    isSubmitting: boolean;
    orderSuccess: boolean;
    errorMessage: string | null;
    clearError: () => void;
    isFormValid: boolean;
    handlePlaceOrder: (e?: React.FormEvent) => Promise<void>;
    handleNewOrder: () => void;
}

/**
 * Custom hook encapsulating cafe order validation, submission, and reset state.
 */
export function useCreateOrder(cafeName = "IDST Backpackers Cafe"): UseCreateOrderReturn {
    const router = useRouter();
    const {
        cartItems,
        clearCart,
        totalQuantity,
        totalPrice,
        customerName,
        setCustomerName,
        customerNumber,
        setCustomerNumber,
        notes,
        setNotes,
    } = useCafeCart();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const clearError = useCallback(() => {
        setErrorMessage(null);
    }, []);

    const isFormValid = useMemo(
        () =>
            customerName.trim().length > 0 &&
            customerNumber.trim().length >= 10 &&
            cartItems.length > 0 &&
            cartItems.every((i) => i.price > 0),
        [customerName, customerNumber, cartItems]
    );

    const handlePlaceOrder = useCallback(
        async (e?: React.FormEvent) => {
            if (e) e.preventDefault();
            setErrorMessage(null);

            if (!customerName.trim()) {
                setErrorMessage("Please enter customer name.");
                return;
            }

            if (customerNumber.trim().length < 10) {
                setErrorMessage("Please enter a valid 10-digit mobile number.");
                return;
            }

            if (cartItems.length === 0) {
                setErrorMessage("Your cart is empty. Please add items from menu.");
                return;
            }

            const unpricedItem = cartItems.find((i) => i.price <= 0);
            if (unpricedItem) {
                setErrorMessage(`Please enter the price for "${unpricedItem.name}".`);
                return;
            }

            try {
                setIsSubmitting(true);

                const orderPayload: CreateOrderPayload = {
                    cafeName,
                    customerName: customerName.trim(),
                    customerNumber: customerNumber.trim(),
                    notes: notes.trim(),
                    items: cartItems.map((i) => ({
                        itemName: i.name,
                        category: i.category,
                        price: i.price,
                        isMrp: i.isMrp,
                        quantity: i.quantity,
                        subtotal: i.subtotal,
                    })),
                    totalPrice,
                    totalUnits: totalQuantity,
                };

                const response = await createOrder(orderPayload);

                if (!response?.success) {
                    throw new Error(response?.message || "Failed to place order. Try again.");
                }

                setOrderSuccess(true);
            } catch (err: unknown) {
                console.error("Order placement error:", err);
                const message =
                    err && typeof err === "object" && "message" in err && typeof err.message === "string"
                        ? err.message
                        : "Failed to place order. Try again.";
                setErrorMessage(message);
            } finally {
                setIsSubmitting(false);
            }
        },
        [cafeName, customerName, customerNumber, notes, cartItems, totalPrice, totalQuantity]
    );

    const handleNewOrder = useCallback(() => {
        clearCart();
        setCustomerName("");
        setCustomerNumber("");
        setNotes("");
        setErrorMessage(null);
        setOrderSuccess(false);
        router.push("/cafe/menu");
    }, [clearCart, setCustomerName, setCustomerNumber, setNotes, router]);

    return {
        isSubmitting,
        orderSuccess,
        errorMessage,
        clearError,
        isFormValid,
        handlePlaceOrder,
        handleNewOrder,
    };
}

export default useCreateOrder;
