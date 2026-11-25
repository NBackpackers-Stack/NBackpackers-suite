"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
    getMenu,
    addMenuItem,
    editMenuItem,
    deleteMenuItem,
    MenuItemPayload,
    AddMenuItemPayload,
    EditMenuItemPayload,
} from "@/services/menu.service";
import { menuItems as defaultMenuItems } from "@/utils/menu";

export interface UseEditMenuReturn {
    menuItems: MenuItemPayload[];
    filteredItems: MenuItemPayload[];
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isLoading: boolean;
    isSubmitting: boolean;
    errorMessage: string | null;
    successMessage: string | null;
    clearMessages: () => void;
    refetchMenu: () => Promise<void>;

    // Add Modal
    isAddModalOpen: boolean;
    openAddModal: () => void;
    closeAddModal: () => void;
    addForm: AddMenuItemPayload;
    setAddForm: React.Dispatch<React.SetStateAction<AddMenuItemPayload>>;
    handleAddSubmit: (e?: React.FormEvent) => Promise<void>;

    // Edit Modal
    isEditModalOpen: boolean;
    editingItem: MenuItemPayload | null;
    openEditModal: (item: MenuItemPayload) => void;
    closeEditModal: () => void;
    editForm: EditMenuItemPayload;
    setEditForm: React.Dispatch<React.SetStateAction<EditMenuItemPayload>>;
    handleEditSubmit: (e?: React.FormEvent) => Promise<void>;

    // Delete Modal
    isDeleteModalOpen: boolean;
    deletingItem: MenuItemPayload | null;
    openDeleteModal: (item: MenuItemPayload) => void;
    closeDeleteModal: () => void;
    handleDeleteSubmit: () => Promise<void>;
}

// Helper to notify other tabs/views across the application immediately
const broadcastMenuUpdate = () => {
    if (typeof window !== "undefined") {
        try {
            localStorage.setItem("cafe_menu_updated_at", Date.now().toString());
            if ("BroadcastChannel" in window) {
                const bc = new BroadcastChannel("cafe_menu_channel");
                bc.postMessage({ type: "MENU_UPDATED", timestamp: Date.now() });
                bc.close();
            }
        } catch {
            // Ignore broadcast / localStorage errors
        }
    }
};

export function useEditMenu(cafeName = "IDST Backpackers Cafe"): UseEditMenuReturn {
    const [menuItems, setMenuItems] = useState<MenuItemPayload[]>(defaultMenuItems);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    // Add Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [addForm, setAddForm] = useState<AddMenuItemPayload>({
        category: "Snacks & Bites",
        item: "",
        price: "₹",
        isAvailable: true,
        cafeName,
    });

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [editingItem, setEditingItem] = useState<MenuItemPayload | null>(null);
    const [editForm, setEditForm] = useState<EditMenuItemPayload>({
        itemId: "",
        oldItemName: "",
        category: "",
        item: "",
        price: "",
        isAvailable: true,
        cafeName,
    });

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [deletingItem, setDeletingItem] = useState<MenuItemPayload | null>(null);

    const clearMessages = useCallback(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
    }, []);

    // Fetch Menu
    const fetchMenu = useCallback(async () => {
        try {
            setIsLoading(true);
            setErrorMessage(null);
            const res = await getMenu(cafeName);

            if (res && res.data && Array.isArray(res.data.items) && res.data.items.length > 0) {
                setMenuItems(res.data.items);
            } else {
                setMenuItems(defaultMenuItems);
            }
        } catch (err: any) {
            console.warn("Could not fetch database menu, using default fallback:", err?.message || err);
            setMenuItems(defaultMenuItems);
        } finally {
            setIsLoading(false);
        }
    }, [cafeName]);

    useEffect(() => {
        fetchMenu();
    }, [fetchMenu]);

    // Unique Categories
    const categories = useMemo(() => {
        const unique = Array.from(new Set(menuItems.map((m) => m.category).filter(Boolean)));
        return ["All", ...unique];
    }, [menuItems]);

    // Filtered Items
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

    // Add Modal Handlers
    const openAddModal = useCallback(() => {
        setAddForm({
            category: categories.find((c) => c !== "All") || "Snacks & Bites",
            item: "",
            price: "₹",
            isAvailable: true,
            cafeName,
        });
        clearMessages();
        setIsAddModalOpen(true);
    }, [categories, cafeName, clearMessages]);

    const closeAddModal = useCallback(() => {
        setIsAddModalOpen(false);
    }, []);

    const handleAddSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        clearMessages();

        if (!addForm.item.trim()) {
            setErrorMessage("Please enter an item name.");
            return;
        }

        if (!addForm.price.trim() || addForm.price === "₹") {
            setErrorMessage("Please enter a valid price (e.g. ₹50 or M.R.P.).");
            return;
        }

        try {
            setIsSubmitting(true);
            const res = await addMenuItem({
                ...addForm,
                category: addForm.category.trim(),
                item: addForm.item.trim(),
                price: addForm.price.trim(),
            });

            setSuccessMessage(res?.message || `"${addForm.item}" added to menu successfully.`);
            setIsAddModalOpen(false);

            // Notify all other pages and tabs immediately
            broadcastMenuUpdate();

            await fetchMenu();
        } catch (err: any) {
            setErrorMessage(err?.message || "Failed to add item to menu.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Edit Modal Handlers
    const openEditModal = useCallback(
        (item: MenuItemPayload) => {
            setEditingItem(item);
            setEditForm({
                itemId: item._id,
                oldItemName: item.item,
                category: item.category,
                item: item.item,
                price: item.price,
                isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
                cafeName,
            });
            clearMessages();
            setIsEditModalOpen(true);
        },
        [cafeName, clearMessages]
    );

    const closeEditModal = useCallback(() => {
        setIsEditModalOpen(false);
        setEditingItem(null);
    }, []);

    const handleEditSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        clearMessages();

        if (!editForm.item.trim()) {
            setErrorMessage("Item name cannot be empty.");
            return;
        }

        if (!editForm.price.trim()) {
            setErrorMessage("Price cannot be empty.");
            return;
        }

        try {
            setIsSubmitting(true);
            const res = await editMenuItem({
                ...editForm,
                category: editForm.category.trim(),
                item: editForm.item.trim(),
                price: editForm.price.trim(),
            });

            setSuccessMessage(res?.message || `"${editForm.item}" updated successfully.`);
            setIsEditModalOpen(false);
            setEditingItem(null);

            // Notify all other pages and tabs immediately
            broadcastMenuUpdate();

            await fetchMenu();
        } catch (err: any) {
            setErrorMessage(err?.message || "Failed to update item.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Delete Modal Handlers
    const openDeleteModal = useCallback(
        (item: MenuItemPayload) => {
            setDeletingItem(item);
            clearMessages();
            setIsDeleteModalOpen(true);
        },
        [clearMessages]
    );

    const closeDeleteModal = useCallback(() => {
        setIsDeleteModalOpen(false);
        setDeletingItem(null);
    }, []);

    const handleDeleteSubmit = async () => {
        if (!deletingItem) return;
        clearMessages();

        try {
            setIsSubmitting(true);
            const res = await deleteMenuItem({
                itemId: deletingItem._id,
                itemName: deletingItem.item,
                cafeName,
            });

            setSuccessMessage(res?.message || `"${deletingItem.item}" removed from menu.`);
            setIsDeleteModalOpen(false);
            setDeletingItem(null);

            // Notify all other pages and tabs immediately
            broadcastMenuUpdate();

            await fetchMenu();
        } catch (err: any) {
            setErrorMessage(err?.message || "Failed to delete item.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        menuItems,
        filteredItems,
        categories,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isLoading,
        isSubmitting,
        errorMessage,
        successMessage,
        clearMessages,
        refetchMenu: fetchMenu,

        isAddModalOpen,
        openAddModal,
        closeAddModal,
        addForm,
        setAddForm,
        handleAddSubmit,

        isEditModalOpen,
        editingItem,
        openEditModal,
        closeEditModal,
        editForm,
        setEditForm,
        handleEditSubmit,

        isDeleteModalOpen,
        deletingItem,
        openDeleteModal,
        closeDeleteModal,
        handleDeleteSubmit,
    };
}

export default useEditMenu;
