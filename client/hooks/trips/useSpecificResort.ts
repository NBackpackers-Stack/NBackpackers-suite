import { useState, useEffect } from 'react';
import { getRecciById } from '@/services/recci.services';

export default function useSpecificResort(id: string) {
    const [resort, setResort] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResort = async () => {
            if (!id) return;
            
            try {
                setLoading(true);
                const response = await getRecciById(id);
                if (response.success) {
                    setResort(response.data);
                } else {
                    setError('Failed to fetch resort details');
                }
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching details');
            } finally {
                setLoading(false);
            }
        };

        fetchResort();
    }, [id]);

    return {
        resort,
        loading,
        error
    };
}
