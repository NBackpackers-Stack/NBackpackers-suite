import { useState, useEffect } from 'react';
import { getFeedback } from '@/services/mess.services';

export interface FeedbackData {
  _id: string;
  messId?: string;
  name: string;
  number: string;
  batchNumber?: string;
  email: string;
  message: string;
  ratingTaste: number;
  ratingFreshness: number;
  ratingQuality: number;
  ratingPortion: number;
  ratingOverall: number;
  image?: string;
  createdAt: string;
}

export const useMessFeedback = (messId?: string) => {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getFeedback(messId);
      if (response.success) {
        setFeedbacks(response.data);
      } else {
        setError(response.message || "Failed to fetch feedback");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [messId]);

  return { feedbacks, isLoading, error, refetch: fetchFeedbacks };
};
