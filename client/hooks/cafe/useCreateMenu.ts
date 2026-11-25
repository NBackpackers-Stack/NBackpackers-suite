"use client";

import { useState, useMemo, useCallback } from "react";
import { createMenu, MenuItemPayload } from "@/services/menu.service";
import { menuItems as defaultMenuItems } from "@/utils/menu";

export interface UseCreateMenuReturn {
    rawJson: string;
    setRawJson: (val: string) => void;
    parsedItems: MenuItemPayload[];
    parseError: string | null;
    itemCount: number;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string | null;
    successMessage: string | null;
    loadSampleMenu: () => void;
    clearInput: () => void;
    handleSubmit: (e?: React.FormEvent) => Promise<void>;
}

export function useCreateMenu(): UseCreateMenuReturn {
    const [rawJson, setRawJson] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Parse and validate the raw input
    const { parsedItems, parseError, itemCount } = useMemo(() => {
        const trimmed = rawJson.trim();
        if (!trimmed) {
            return { parsedItems: [] as MenuItemPayload[], parseError: null, itemCount: 0 };
        }

        try {
            let parsed: any;
            try {
                parsed = JSON.parse(trimmed);
            } catch {
                // Allow JS object array format (unquoted keys or single quotes)
                const sanitized = trimmed
                    .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
                    .replace(/'/g, '"');
                parsed = JSON.parse(sanitized);
            }

            const itemsArray: any[] = Array.isArray(parsed)
                ? parsed
                : parsed && Array.isArray(parsed.items)
                ? parsed.items
                : null;

            if (!itemsArray) {
                return {
                    parsedItems: [] as MenuItemPayload[],
                    parseError: "Input must be an array of objects: [ { category, item, price }, ... ]",
                    itemCount: 0,
                };
            }

            const validItems: MenuItemPayload[] = [];
            for (let i = 0; i < itemsArray.length; i++) {
                const it = itemsArray[i];
                if (!it || typeof it !== "object") {
                    return {
                        parsedItems: [] as MenuItemPayload[],
                        parseError: `Item at index ${i} is not a valid object.`,
                        itemCount: 0,
                    };
                }

                const category = it.category || it.Category;
                const item = it.item || it.Item || it.name || it.itemName;
                const price = it.price || it.Price;

                if (!category || !item || !price) {
                    return {
                        parsedItems: [] as MenuItemPayload[],
                        parseError: `Item at index ${i} is missing category, item, or price.`,
                        itemCount: 0,
                    };
                }

                validItems.push({
                    category: String(category).trim(),
                    item: String(item).trim(),
                    price: String(price).trim(),
                    isAvailable: it.isAvailable !== undefined ? Boolean(it.isAvailable) : true,
                });
            }

            return {
                parsedItems: validItems,
                parseError: null,
                itemCount: validItems.length,
            };
        } catch (err: any) {
            return {
                parsedItems: [] as MenuItemPayload[],
                parseError: `JSON Parse Error: ${err.message}`,
                itemCount: 0,
            };
        }
    }, [rawJson]);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
        setIsSuccess(false);
        setErrorMessage(null);
        setSuccessMessage(null);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const loadSampleMenu = useCallback(() => {
        setRawJson(JSON.stringify(defaultMenuItems, null, 2));
        setErrorMessage(null);
        setIsSuccess(false);
        setSuccessMessage(null);
    }, []);

    const clearInput = useCallback(() => {
        setRawJson("");
        setErrorMessage(null);
        setIsSuccess(false);
        setSuccessMessage(null);
    }, []);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!rawJson.trim()) {
            setErrorMessage("Please paste an array of menu objects.");
            return;
        }

        if (parseError) {
            setErrorMessage(parseError);
            return;
        }

        if (parsedItems.length === 0) {
            setErrorMessage("No valid items found in the input array.");
            return;
        }

        try {
            setIsLoading(true);
            const res = await createMenu({
                cafeName: "IDST Backpackers Cafe",
                items: parsedItems,
            });

            setIsSuccess(true);
            setSuccessMessage(
                res?.message || `Successfully created menu with ${parsedItems.length} items in database!`
            );
            if (typeof window !== "undefined") {
                localStorage.setItem("cafe_menu_updated_at", Date.now().toString());
            }
        } catch (err: any) {
            console.error("Failed to save menu:", err);
            setErrorMessage(err?.message || "Failed to save menu to database. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        rawJson,
        setRawJson,
        parsedItems,
        parseError,
        itemCount,
        isModalOpen,
        openModal,
        closeModal,
        isLoading,
        isSuccess,
        errorMessage,
        successMessage,
        loadSampleMenu,
        clearInput,
        handleSubmit,
    };
}
