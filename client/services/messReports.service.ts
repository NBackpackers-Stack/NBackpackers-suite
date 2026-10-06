import axios from 'axios';
import { resolve } from 'path';

export const messReportsService = {
    fetchReports: async (type: 'consumption' | 'purchase', date?: string, item?: string, messId?: string) => {
        let url = `/api/mess/reports?type=${type}`;
        if (messId) url += `&messId=${encodeURIComponent(messId)}`;
        if (date) url += `&date=${encodeURIComponent(date)}`;
        if (item) url += `&item=${encodeURIComponent(item)}`;

        const response = await axios.get(url);
        console.log("data for reports", response);

        return response.data;
    }
};
