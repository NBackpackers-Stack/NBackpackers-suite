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

    const fetchMenu = useCallback(async (isSilent = false) => {
        try {
            if (!isSilent) {
                setIsLoading(true);
            }
            setErrorMessage(null);

            const res = await getMenu(cafeName);

            if (res && res.data && Array.isArray(res.data.items) && res.data.items.length > 0) {
                // Map items from database
                const dbItems: MenuItemType[] = res.data.items.map((i: any) => ({
                    _id: i._id,
                    category: i.category,
                    item: i.item,
                    price: i.price,
                    isAvailable: i.isAvailable !== undefined ? Boolean(i.isAvailable) : true,
                }));
                setMenuItems(dbItems);
                setIsFromDatabase(true);
            } else {
                // Graceful fallback to static menu if no items returned
                setMenuItems(defaultMenuItems);
                setIsFromDatabase(false);
            }
        } catch (err: any) {
            console.warn("Could not fetch menu from database, keeping current menu:", err?.message || err);
            // Don't wipe active dishes on silent background polling errors
            setMenuItems((prev) => (prev && prev.length > 0 ? prev : defaultMenuItems));
            setErrorMessage(err?.message || "Using local menu");
        } finally {
            if (!isSilent) {
                setIsLoading(false);
            }
        }
    }, [cafeName]);

    useEffect(() => {
        // Initial fetch on component mount (with visible loading state)
        fetchMenu(false);

        // 1. Background interval polling every 2.5 seconds (silent, zero UI flicker)
        const intervalId = setInterval(() => {
            fetchMenu(true);
        }, 2500);

        // 2. Immediate refetch on window focus or tab visibility change
        const handleVisibilityOrFocus = () => {
            if (document.visibilityState === "visible") {
                fetchMenu(true);
            }
        };

        // 3. Immediate cross-tab sync when editMenu saves changes via localStorage
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "cafe_menu_updated_at") {
                fetchMenu(true);
            }
        };

        // 4. Instant cross-tab sync via BroadcastChannel (0ms delay)
        let channel: BroadcastChannel | null = null;
        try {
            if (typeof window !== "undefined" && "BroadcastChannel" in window) {
                channel = new BroadcastChannel("cafe_menu_channel");
                channel.onmessage = (event) => {
                    if (event.data?.type === "MENU_UPDATED") {
                        fetchMenu(true);
                    }
                };
            }
        } catch {
            // BroadcastChannel fallback silently if unsupported
        }

        window.addEventListener("focus", handleVisibilityOrFocus);
        document.addEventListener("visibilitychange", handleVisibilityOrFocus);
        window.addEventListener("storage", handleStorageChange);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("focus", handleVisibilityOrFocus);
            document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
            window.removeEventListener("storage", handleStorageChange);
            if (channel) {
                channel.close();
            }
        };
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
