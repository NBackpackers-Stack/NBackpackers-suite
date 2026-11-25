"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { getMenu } from "@/services/menu.service";
import { menuItems as defaultMenuItems } from "@/utils/menu";
import { MenuItemType } from "@/hooks/cafe/useCafeCart";

export interface UseGetMenuReturn {
    menuItems: MenuItemType[];
    filteredItems: MenuItemType[];
    groupedItems: Record<string, MenuItemType[]>;
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isLoading: boolean;
    isFromDatabase: boolean;
    errorMessage: string | null;
    refetch: () => Promise<void>;
}

export function useGetMenu(cafeName = "IDST Backpackers Cafe"): UseGetMenuReturn {
    const [menuItems, setMenuItems] = useState<MenuItemType[]>(defaultMenuItems);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFromDatabase, setIsFromDatabase] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const fetchMenu = useCallback(async () => {
        try {
            setIsLoading(true);
            setErrorMessage(null);

            const res = await getMenu(cafeName);

            if (res && res.data && Array.isArray(res.data.items) && res.data.items.length > 0) {
                // Map items from database
                const dbItems: MenuItemType[] = res.data.items.map((i: any) => ({
                    category: i.category,
                    item: i.item,
                    price: i.price,
                }));
                setMenuItems(dbItems);
                setIsFromDatabase(true);
            } else {
                // Graceful fallback to static menu if no items found in DB
                setMenuItems(defaultMenuItems);
                setIsFromDatabase(false);
            }
        } catch (err: any) {
            console.warn("Could not fetch menu from database, using default menu:", err?.message || err);
            setMenuItems(defaultMenuItems);
            setIsFromDatabase(false);
            setErrorMessage(err?.message || "Using local menu");
        } finally {
            setIsLoading(false);
        }
    }, [cafeName]);

    useEffect(() => {
        fetchMenu();
    }, [fetchMenu]);

    // Extract unique categories
    const categories = useMemo(() => {
        const unique = Array.from(new Set(menuItems.map((m) => m.category)));
        return ["All", ...unique];
    }, [menuItems]);

    // Filtered menu items by category & search query
    const filteredItems = useMemo(() => {
        return menuItems.filter((item) => {
            const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
            const matchesSearch =
                searchQuery.trim() === "" ||
                item.item.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase().trim());
            return matchesCategory && matchesSearch;
        });
    }, [menuItems, searchQuery, selectedCategory]);

    // Group items by category for clean section display
    const groupedItems = useMemo(() => {
        const groups: Record<string, MenuItemType[]> = {};
        filteredItems.forEach((item) => {
            if (!groups[item.category]) {
                groups[item.category] = [];
            }
            groups[item.category].push(item);
        });
        return groups;
    }, [filteredItems]);

    return {
        menuItems,
        filteredItems,
        groupedItems,
        categories,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isLoading,
        isFromDatabase,
        errorMessage,
        refetch: fetchMenu,
    };
}

// User-requested alternate naming alias
export const useGetManu = useGetMenu;
export default useGetMenu;
