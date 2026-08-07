import { useState, ChangeEvent, FormEvent } from 'react';
import { submitFeedback } from '@/services/mess.services';

export interface QRCodeFormData {
  message: string;
  name: string;
  number: string;
  batchNumber: string;
  email: string;
  ratingTaste: number;
  ratingFreshness: number;
  ratingQuality: number;
  ratingPortion: number;
  ratingOverall: number;
  image: File | null;
}

export const useQRCodeForm = () => {
  const [formData, setFormData] = useState<QRCodeFormData>({
    message: '',
    name: '',
    number: '',
    batchNumber: '',
    email: '',
    ratingTaste: 0,
    ratingFreshness: 0,
    ratingQuality: 0,
    ratingPortion: 0,
    ratingOverall: 0,
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (name: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.ratingTaste || !formData.ratingFreshness || !formData.ratingQuality || !formData.ratingPortion || !formData.ratingOverall) {
      alert("Please provide a rating for all questions before submitting.");
      return;
    }

    // if (!formData.image) {
    //   alert("Please upload an image before submitting.");
    //   return;
    // }

    setIsSubmitting(true);
    try {
      const res = await submitFeedback(formData);
      console.log("QR code Hook", res);

      if (res.success) {
        setIsSuccess(true);
        setFormData({
          message: '', name: '', number: '', batchNumber: '', email: '',
          ratingTaste: 0, ratingFreshness: 0, ratingQuality: 0,
          ratingPortion: 0, ratingOverall: 0, image: null
        });
      }

    } catch (error) {
      console.error("Form submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccess(false);
  };

  return {
    formData,
    isSubmitting,
    isSuccess,
    handleTextChange,
    handleRatingChange,
    handleImageChange,
    handleSubmit,
    closeSuccessModal
  };
};
