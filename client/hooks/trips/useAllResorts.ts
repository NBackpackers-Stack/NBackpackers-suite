import { useState, useEffect } from 'react';
import { getAllRecci } from '@/services/recci.services';
import { useRouter } from 'next/navigation';

export default function useAllResorts() {
    const [resorts, setResorts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchResorts = async () => {
            try {
                const response = await getAllRecci();
                if (response.success) {
                    setResorts(response.data);
                } else {
                    setError('Failed to fetch resorts');
                }
            } catch (err: any) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchResorts();
    }, []);

    const handleResortClick = (id: string) => {
        router.push(`/trips/getSpecificResort/${id}`);
    };

    return {
        resorts,
        loading,
        error,
        handleResortClick
    };
}
