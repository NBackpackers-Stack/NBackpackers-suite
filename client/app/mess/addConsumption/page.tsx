"use client"
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Consumption from '@/component/Inventory/addConsumption';

function AddConsumptionContent() {
    const searchParams = useSearchParams();
    const messId = searchParams.get('messId') || '';
    
    return <Consumption messId={messId} />;
}

export default function AddConsumptionPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
                <AddConsumptionContent />
            </Suspense>
        </div>
    );
}