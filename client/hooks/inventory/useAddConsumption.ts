
import React, { useState, useEffect } from 'react';
import { getInventory, addConsumption } from '@/services/inventory.services';

interface InventoryItem {
    _id: string;
    item_id?: string;
    item_name: string;
    unit: string;
}

interface ConsumptionRow {
    id: number;
    item_name: string;
    quantity: number | string;
    unit: string;
}

export interface MealBlock {
    id: number;
    meal_type: string;
    rows: ConsumptionRow[];
}

export default function useAddConsumption() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [mealBlocks, setMealBlocks] = useState<MealBlock[]>([
        { id: Date.now(), meal_type: '', rows: [{ id: Date.now() + 1, item_name: '', quantity: '', unit: '' }] }
    ]);
    const [image, setImage] = useState<File | null>(null);

    const [inventoryId, setInventoryId] = useState<string>("6a4fe5ee25faa16a764e7b2b");

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const data = await getInventory(inventoryId);

                if (data && data.data && data.data.items) {
                    setItems(data.data.items);
                } else if (Array.isArray(data)) {
                    setItems(data);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to fetch inventory data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchInventory();
    }, [inventoryId]);

    const handleAddMealBlock = () => {
        setMealBlocks([...mealBlocks, { id: Date.now(), meal_type: '', rows: [{ id: Date.now() + 1, item_name: '', quantity: '', unit: '' }] }]);
    };

    const handleRemoveMealBlock = (blockId: number) => {
        if (mealBlocks.length > 1) {
            setMealBlocks(mealBlocks.filter(block => block.id !== blockId));
        }
    };

    const handleMealTypeChange = (blockId: number, mealType: string) => {
        setMealBlocks(mealBlocks.map(block =>
            block.id === blockId ? { ...block, meal_type: mealType } : block
        ));
    };

    const handleAddRow = (blockId: number) => {
        setMealBlocks(mealBlocks.map(block =>
            block.id === blockId ? { ...block, rows: [...block.rows, { id: Date.now(), item_name: '', quantity: '', unit: '' }] } : block
        ));
    };

    const handleRemoveRow = (blockId: number, rowId: number) => {
        setMealBlocks(mealBlocks.map(block =>
            block.id === blockId && block.rows.length > 1
                ? { ...block, rows: block.rows.filter(r => r.id !== rowId) }
                : block
        ));
    };

    const handleItemChange = (blockId: number, rowId: number, selectedItemName: string) => {
        const selectedItem = items.find(item => item.item_name === selectedItemName);
        setMealBlocks(mealBlocks.map(block =>
            block.id === blockId ? {
                ...block,
                rows: block.rows.map(row =>
                    row.id === rowId ? { ...row, item_name: selectedItemName, unit: selectedItem ? selectedItem.unit : '' } : row
                )
            } : block
        ));
    };

    const handleQuantityChange = (blockId: number, rowId: number, quantity: string) => {
        setMealBlocks(mealBlocks.map(block =>
            block.id === blockId ? {
                ...block,
                rows: block.rows.map(row =>
                    row.id === rowId ? { ...row, quantity } : row
                )
            } : block
        ));
    };

    const handleSubmit = async () => {
        const payload: Record<string, any> = {
            documentId: inventoryId
        };
        mealBlocks.forEach(block => {
            if (block.meal_type) {
                payload[block.meal_type] = block.rows.map((r) => {
                    const matchedItem = items.find(item => item.item_name === r.item_name);
                    return {
                        id: matchedItem ? (matchedItem._id || matchedItem.item_id) : "",
                        item: r.item_name,
                        quantity: r.quantity,
                        unit: r.unit
                    };
                });
            }
        });

        console.log("Submitting consumption", JSON.stringify(payload, null, 2));
        console.log("Image attached:", image);

        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify(payload));
            if (image) {
                formData.append('image', image);
            }
            console.log("-----", formData);

            const response = await addConsumption(formData);
            console.log("Consumption added successfully", response);
            alert("Consumption submitted successfully!");
            // Reset state here if needed
        } catch (err: any) {
            console.error("Failed to submit consumption", err);
            alert("Failed to submit consumption. Please try again.");
        }
    };

    return {
        items,
        error,
        isLoading,
        mealBlocks,
        handleAddMealBlock,
        handleRemoveMealBlock,
        handleMealTypeChange,
        handleAddRow,
        handleRemoveRow,
        handleItemChange,
        handleQuantityChange,
        image,
        setImage,
        handleSubmit
    }
}