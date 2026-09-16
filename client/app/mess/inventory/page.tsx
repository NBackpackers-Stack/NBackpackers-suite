"use client"
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import InventoryStatusPage from '@/component/Inventory/invetoryStatus';

function InventoryStatusContent() {
    const searchParams = useSearchParams();
    const messId = searchParams.get('messId') || '';
    
    return <InventoryStatusPage messId={messId} />;
}

export default function InventoryPage() {
    return (
        <main>
            <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading inventory...</div>}>
                <InventoryStatusContent />
            </Suspense>
        </main>
    );
}