"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

export interface CartItem {
    name: string;
    category: string;
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

export const parseMenuPrice = (priceStr?: string): { numericPrice: number; isMrp: boolean } => {
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

interface CafeCartContextType {
    cartItems: CartItem[];
    addToCart: (menuItem: MenuItemType) => void;
    decrementItem: (itemName: string) => void;
    deleteItem: (itemName: string) => void;
    updateItemPrice: (itemName: string, newPrice: number) => void;
    clearCart: () => void;
    getItemQuantity: (itemName: string) => number;
    totalQuantity: number;
    totalPrice: number;
    customerName: string;
    setCustomerName: (name: string) => void;
    customerNumber: string;
    setCustomerNumber: (num: string) => void;
    notes: string;
    setNotes: (notes: string) => void;
}

const CafeCartContext = createContext<CafeCartContextType | undefined>(undefined);

const STORAGE_KEY = "backpacker_cafe_cart_v1";

export function CafeCartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [customerName, setCustomerName] = useState<string>("");
    const [customerNumber, setCustomerNumber] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    // Load cart from localStorage on client mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setCartItems(parsed);
                }
            }
        } catch (e) {
            console.error("Failed to load cafe cart from localStorage:", e);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        if (!isInitialized) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
        } catch (e) {
            console.error("Failed to save cafe cart to localStorage:", e);
        }
    }, [cartItems, isInitialized]);

    // Add item to cart or increment
    const addToCart = useCallback((menuItem: MenuItemType) => {
        setCartItems((prev) => {
            const existingIndex = prev.findIndex((i) => i.name === menuItem.item);
            if (existingIndex > -1) {
                const updated = [...prev];
                const item = updated[existingIndex];
                const newQty = item.quantity + 1;
                updated[existingIndex] = {
                    ...item,
                    quantity: newQty,
                    subtotal: item.price * newQty,
                };
                return updated;
            }

            const { numericPrice, isMrp } = parseMenuPrice(menuItem.price);
            const newItem: CartItem = {
                name: menuItem.item,
                category: menuItem.category,
                price: numericPrice,
                isMrp,
                quantity: 1,
                subtotal: numericPrice * 1,
            };
            return [...prev, newItem];
        });
    }, []);

    // Decrement item or remove if 0
    const decrementItem = useCallback((itemName: string) => {
        setCartItems((prev) => {
            const existingIndex = prev.findIndex((i) => i.name === itemName);
            if (existingIndex === -1) return prev;

            const item = prev[existingIndex];
            if (item.quantity <= 1) {
                return prev.filter((i) => i.name !== itemName);
            }

            const updated = [...prev];
            const newQty = item.quantity - 1;
            updated[existingIndex] = {
                ...item,
                quantity: newQty,
                subtotal: item.price * newQty,
            };
            return updated;
        });
    }, []);

    // Completely remove an item
    const deleteItem = useCallback((itemName: string) => {
        setCartItems((prev) => prev.filter((i) => i.name !== itemName));
    }, []);

    // Update price (for MRP or custom pricing)
    const updateItemPrice = useCallback((itemName: string, newPrice: number) => {
        const safePrice = Math.max(0, isNaN(newPrice) ? 0 : newPrice);
        setCartItems((prev) =>
            prev.map((i) => {
                if (i.name !== itemName) return i;
                return {
                    ...i,
                    price: safePrice,
                    subtotal: safePrice * i.quantity,
                };
            })
        );
    }, []);

    // Clear cart
    const clearCart = useCallback(() => {
        setCartItems([]);
        setNotes("");
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {}
    }, []);

    // Get quantity of a specific item
    const getItemQuantity = useCallback(
        (itemName: string) => {
            const item = cartItems.find((i) => i.name === itemName);
            return item ? item.quantity : 0;
        },
        [cartItems]
    );

    // Computed totals
    const totalQuantity = useMemo(() => {
        return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
    }, [cartItems]);

    const totalPrice = useMemo(() => {
        return cartItems.reduce((acc, curr) => acc + curr.subtotal, 0);
    }, [cartItems]);

    const value = useMemo(
        () => ({
            cartItems,
            addToCart,
            decrementItem,
            deleteItem,
            updateItemPrice,
            clearCart,
            getItemQuantity,
            totalQuantity,
            totalPrice,
            customerName,
            setCustomerName,
            customerNumber,
            setCustomerNumber,
            notes,
            setNotes,
        }),
        [
            cartItems,
            addToCart,
            decrementItem,
            deleteItem,
            updateItemPrice,
            clearCart,
            getItemQuantity,
            totalQuantity,
            totalPrice,
            customerName,
            customerNumber,
            notes,
        ]
    );

    return <CafeCartContext.Provider value={value}>{children}</CafeCartContext.Provider>;
}

export function useCafeCart() {
    const context = useContext(CafeCartContext);
    if (!context) {
        throw new Error("useCafeCart must be used within a CafeCartProvider");
    }
    return context;
}
