import axios from 'axios';

export const messReportsService = {
    fetchReports: async (type: 'consumption' | 'purchase', date?: string, item?: string) => {
        let url = `/api/mess/reports?type=${type}`;
        if (date) url += `&date=${encodeURIComponent(date)}`;
        if (item) url += `&item=${encodeURIComponent(item)}`;
        
        const response = await axios.get(url);
        return response.data;
    }
};
