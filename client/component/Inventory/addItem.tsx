"use client";
import { useParams } from 'next/navigation';
import { useAddItem } from "@/hooks/inventory/useAddItem";
const AddItem = () => {


    const params = useParams();
    const id = params.id;
    console.log("here is the ID", id)

    const { formData, handleChange, handleSubmit } = useAddItem(id as string)
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Add New Item</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="item_name" className="block text-sm font-medium text-gray-700">
                                Item Name
                            </label>
                            <input
                                type="text"
                                id="item_name"
                                name="item_name"
                                value={formData.item_name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="e.g. Tomato"
                            />
                        </div>

                        <div>
                            <label htmlFor="item_id" className="block text-sm font-medium text-gray-700">
                                Item ID
                            </label>
                            <input
                                type="text"
                                id="item_id"
                                name="item_id"
                                value={formData.item_id}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="e.g. ITM01"
                            />
                        </div>

                        <div>
                            <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                                Unit
                            </label>
                            <input
                                type="text"
                                id="unit"
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="e.g. kg, liter, pcs"
                            />
                        </div>

                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                Quantity
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="e.g. 10"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Add Item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddItem;
