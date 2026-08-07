import React, { useEffect, useState } from 'react';

import { getInventory } from '@/services/inventory.services';


interface InventoryItem {
    _id: string;
    item_id: string;
    item_name: string;
    unit: string;
    current_stock: number;
    last_updated: string;
}

export default function useInventory() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const id = "6a4fe5ee25faa16a764e7b2b";

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const data = await getInventory(id);
                // Assumes the backend returns { success: true, data: [...] }
                console.log("from get invenroty", data.data.items);

                if (data && data.data.items) {
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
    }, []);

    return {
        items,
        isLoading,
        error,
        id
    }
}