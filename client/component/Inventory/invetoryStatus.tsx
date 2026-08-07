
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useInventory from '@/hooks/inventory/useInventory';
import InventoryTable from '@/component/Inventory/InventoryTable';
import AnimatedLoader from '@/component/AnimatedLoader';

const InventoryStatusPage = () => {

    const { items, isLoading, error, id } = useInventory();

    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredItems = items.filter(item =>
        item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
        {isLoading && <AnimatedLoader />}
        <div className={`min-h-screen bg-gray-50 pt-24 pb-8 px-4 sm:px-6 lg:px-8 ${isLoading ? 'blur-sm pointer-events-none' : ''}`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Inventory Status</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            View current stock levels for all mess inventory items.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full sm:w-64"
                        />
                        <Link href={`/mess/addItems/${id}`}>
                            <button className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap">
                                Add Item
                            </button>
                        </Link>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                        <p>{error}</p>
                    </div>
                )}

                <InventoryTable items={filteredItems} />
            </div>
        </div>
        </>
    );
};

export default InventoryStatusPage;
