import SpecificResort from '@/component/trips/SpecificResort';
import { use } from 'react';

export default function SpecificResortPage({ params }: { params: Promise<{ id: string }> }) {
    // Next.js 15+ recommends awaiting/using params
    const resolvedParams = use(params);

    return <SpecificResort id={resolvedParams.id} />;
}
