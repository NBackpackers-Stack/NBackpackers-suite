"use client"
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PurchaseStock from '@/component/Inventory/purchaseStock';

function PurchaseStockContent() {
    const searchParams = useSearchParams();
    const messId = searchParams.get('messId') || '';
    
    return <PurchaseStock messId={messId} />;
}

export default function PurchaseStockPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
            <PurchaseStockContent />
        </Suspense>
    );
}
