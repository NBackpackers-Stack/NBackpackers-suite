import React, { useState, useEffect } from 'react';
import { getInventory, purchaseStock } from '@/services/inventory.services';

interface InventoryItem {
    _id: string;
    item_id?: string;
    item_name: string;
    unit: string;
}

interface PurchaseRow {
    id: number;
    item_name: string;
    quantity: number | string;
    unit: string;
}

export default function usePurchaseStock() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [rows, setRows] = useState<PurchaseRow[]>([
        { id: Date.now(), item_name: '', quantity: '', unit: '' }
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

    const handleAddRow = () => {
        setRows([...rows, { id: Date.now(), item_name: '', quantity: '', unit: '' }]);
    };

    const handleRemoveRow = (rowId: number) => {
        if (rows.length > 1) {
            setRows(rows.filter(r => r.id !== rowId));
        }
    };

    const handleItemChange = (rowId: number, selectedItemName: string) => {
        const selectedItem = items.find(item => item.item_name === selectedItemName);
        setRows(rows.map(row =>
            row.id === rowId ? { ...row, item_name: selectedItemName, unit: selectedItem ? selectedItem.unit : '' } : row
        ));
    };

    const handleQuantityChange = (rowId: number, quantity: string) => {
        setRows(rows.map(row =>
            row.id === rowId ? { ...row, quantity } : row
        ));
    };

    const handleSubmit = async () => {
        const payload: Record<string, any> = {
            documentId: inventoryId,
            items: rows.map((r) => {
                const matchedItem = items.find(item => item.item_name === r.item_name);
                return {
                    id: matchedItem ? (matchedItem._id || matchedItem.item_id) : "",
                    item: r.item_name,
                    quantity: r.quantity,
                    unit: r.unit
                };
            }).filter(item => item.item && item.quantity)
        };

        console.log("Submitting purchase stock", JSON.stringify(payload, null, 2));
        console.log("Image attached:", image);

        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));
        if (image) {
            formData.append("image", image);
        }

        try {
            console.log("purchase stock payload", await formData);

            const response = await purchaseStock(formData);
            console.log("Purchase stock added successfully", response);
            alert("Stock purchase submitted successfully!");
            // Reset state here if needed
        } catch (err: any) {
            console.error("Failed to submit purchase stock", err);
            alert("Failed to submit stock purchase. Please try again.");
        }
    };

    return {
        items,
        error,
        isLoading,
        rows,
        handleAddRow,
        handleRemoveRow,
        handleItemChange,
        handleQuantityChange,
        image,
        setImage,
        handleSubmit
    }
}
