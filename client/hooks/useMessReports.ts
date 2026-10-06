import { useState, useEffect, useCallback } from 'react';
import { messReportsService } from '@/services/messReports.service';

export const useMessReports = (messId?: string) => {
    const [activeTab, setActiveTab] = useState<'consumption' | 'purchase'>('consumption');
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
    
    const [dateFilter, setDateFilter] = useState('');
    const [itemFilter, setItemFilter] = useState('');

    const fetchReports = useCallback(async (customDate?: string, customItem?: string) => {
        setIsLoading(true);
        try {
            const finalDate = customDate !== undefined ? customDate : dateFilter;
            const finalItem = customItem !== undefined ? customItem : itemFilter;
            
            const responseData = await messReportsService.fetchReports(activeTab, finalDate, finalItem, messId);
            if (responseData.success) {
                setData(responseData.data);
            }
        } catch (error) {
            console.error("Error fetching reports", error);
        } finally {
            setIsLoading(false);
        }
    }, [activeTab, dateFilter, itemFilter, messId]);

    useEffect(() => {
        fetchReports('', ''); // Reset filters on tab or mess change
        setDateFilter('');
        setItemFilter('');
    }, [activeTab, messId]); // trigger on tab change or messId change

    const handleClearFilters = () => {
        setDateFilter('');
        setItemFilter('');
        fetchReports('', '');
    };

    return {
        activeTab,
        setActiveTab,
        data,
        isLoading,
        fullscreenImage,
        setFullscreenImage,
        dateFilter,
        setDateFilter,
        itemFilter,
        setItemFilter,
        fetchReports,
        handleClearFilters
    };
};
