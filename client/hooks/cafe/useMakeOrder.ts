"use client";

import { useState, useMemo, useCallback } from "react";
import { menuItems } from "@/utils/menu";

export interface OrderItem {
    id: string;
    itemName: string;
    category?: string;
    price: number;
    isMrp: boolean;
    quantity: number;
    subtotal: number;
}

export interface MenuItemType {
    category: string;
    item: string;
    price: string;
}

export const parsePriceString = (priceStr?: string): { numericPrice: number; isMrp: boolean } => {
    if (!priceStr) return { numericPrice: 0, isMrp: false };
    const trimmed = priceStr.trim();
    if (trimmed.toUpperCase() === "M.R.P." || trimmed.toUpperCase() === "MRP") {
        return { numericPrice: 0, isMrp: true };
    }
    const digits = trimmed.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(digits);
    return {
        numericPrice: isNaN(parsed) ? 0 : parsed,
        isMrp: false,
    };
};

const createEmptyItem = (): OrderItem => ({
    id: Math.random().toString(36).substring(2, 9),
    itemName: "",
    category: "",
    price: 0,
    isMrp: false,
    quantity: 1,
    subtotal: 0,
});

export const useMakeOrder = () => {
    const [customerName, setCustomerName] = useState<string>("");
    const [customerNumber, setCustomerNumber] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [items, setItems] = useState<OrderItem[]>([createEmptyItem()]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Search query per item row id for suggestions
    const [activeSuggestionRowId, setActiveSuggestionRowId] = useState<string | null>(null);

    // Filtered menu suggestions based on search text
    const getSuggestionsForText = useCallback((text: string): MenuItemType[] => {
        if (!text || text.trim().length === 0) return [];
        const q = text.toLowerCase().trim();
        return menuItems.filter(
            (m) => m.item.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)
        ).slice(0, 8); // Top 8 suggestions
    }, []);

    // Add new item row
    const addItemRow = useCallback(() => {
        setItems((prev) => [...prev, createEmptyItem()]);
    }, []);

    // Remove item row
    const removeItemRow = useCallback((id: string) => {
        setItems((prev) => {
            if (prev.length <= 1) {
                return [createEmptyItem()];
            }
            return prev.filter((item) => item.id !== id);
        });
    }, []);

    // Update item name and check for auto match
    const handleItemNameChange = useCallback((id: string, name: string) => {
        setItems((prev) =>
            prev.map((it) => {
                if (it.id !== id) return it;

                // Check exact match from menu
                const exactMatch = menuItems.find(
                    (m) => m.item.toLowerCase() === name.toLowerCase().trim()
                );

                if (exactMatch) {
                    const { numericPrice, isMrp } = parsePriceString(exactMatch.price);
                    return {
                        ...it,
                        itemName: exactMatch.item,
                        category: exactMatch.category,
                        price: numericPrice,
                        isMrp,
                        subtotal: numericPrice * it.quantity,
                    };
                }

                return {
                    ...it,
                    itemName: name,
                };
            })
        );
    }, []);

    // Select suggestion from menu
    const selectMenuItem = useCallback((rowId: string, menuItem: MenuItemType) => {
        const { numericPrice, isMrp } = parsePriceString(menuItem.price);
        setItems((prev) =>
            prev.map((it) => {
                if (it.id !== rowId) return it;
                return {
                    ...it,
                    itemName: menuItem.item,
                    category: menuItem.category,
                    price: numericPrice,
                    isMrp,
                    subtotal: numericPrice * it.quantity,
                };
            })
        );
        setActiveSuggestionRowId(null);
    }, []);

    // Update price manually (e.g. for M.R.P. or custom pricing)
    const handlePriceChange = useCallback((id: string, newPrice: number) => {
        setItems((prev) =>
            prev.map((it) => {
                if (it.id !== id) return it;
                const safePrice = Math.max(0, isNaN(newPrice) ? 0 : newPrice);
                return {
                    ...it,
                    price: safePrice,
                    subtotal: safePrice * it.quantity,
                };
            })
        );
    }, []);

    // Update quantity
    const handleQuantityChange = useCallback((id: string, newQty: number) => {
        setItems((prev) =>
            prev.map((it) => {
                if (it.id !== id) return it;
                const safeQty = Math.max(1, isNaN(newQty) ? 1 : newQty);
                return {
                    ...it,
                    quantity: safeQty,
                    subtotal: it.price * safeQty,
                };
            })
        );
    }, []);

    // Total price calculation
    const totalPrice = useMemo(() => {
        return items.reduce((acc, curr) => acc + curr.subtotal, 0);
    }, [items]);

    // Total units count
    const totalUnits = useMemo(() => {
        return items.reduce((acc, curr) => acc + (curr.itemName.trim() ? curr.quantity : 0), 0);
    }, [items]);

    // Form validation
    const isValid = useMemo(() => {
        const hasValidCustomer = customerName.trim().length > 0;
        const hasValidPhone = customerNumber.trim().length >= 10;
        const validItems = items.filter((it) => it.itemName.trim().length > 0 && it.price > 0);
        return hasValidCustomer && hasValidPhone && validItems.length > 0;
    }, [customerName, customerNumber, items]);

    // Reset form
    const resetForm = useCallback(() => {
        setCustomerName("");
        setCustomerNumber("");
        setNotes("");
        setItems([createEmptyItem()]);
        setOrderSuccess(false);
        setErrorMessage(null);
    }, []);

    // Handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!customerName.trim()) {
            setErrorMessage("Please enter customer name.");
            return;
        }

        if (customerNumber.trim().length < 10) {
            setErrorMessage("Please enter a valid 10-digit mobile number.");
            return;
        }

        const validItems = items.filter((it) => it.itemName.trim().length > 0);
        if (validItems.length === 0) {
            setErrorMessage("Please add at least one item from the menu.");
            return;
        }

        const unpricedItems = validItems.filter((it) => it.price <= 0);
        if (unpricedItems.length > 0) {
            setErrorMessage(`Please enter a valid price for "${unpricedItems[0].itemName}".`);
            return;
        }

        try {
            setIsSubmitting(true);
            const orderPayload = {
                customerName: customerName.trim(),
                customerNumber: customerNumber.trim(),
                notes: notes.trim(),
                items: validItems.map((i) => ({
                    itemName: i.itemName,
                    category: i.category || "General",
                    price: i.price,
                    quantity: i.quantity,
                    subtotal: i.subtotal,
                })),
                totalPrice,
                totalUnits,
                createdAt: new Date().toISOString(),
            };

            console.log("Backpacker Cafe Order Generated:", orderPayload);

            // Simulate quick API latency / storage
            await new Promise((resolve) => setTimeout(resolve, 600));

            setOrderSuccess(true);
        } catch (err: any) {
            console.error("Order error:", err);
            setErrorMessage(err?.message || "Failed to create order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        customerName,
        setCustomerName,
        customerNumber,
        setCustomerNumber,
        notes,
        setNotes,
        items,
        addItemRow,
        removeItemRow,
        handleItemNameChange,
        selectMenuItem,
        handlePriceChange,
        handleQuantityChange,
        activeSuggestionRowId,
        setActiveSuggestionRowId,
        getSuggestionsForText,
        totalPrice,
        totalUnits,
        isValid,
        isSubmitting,
        orderSuccess,
        errorMessage,
        resetForm,
        handleSubmit,
    };
};
