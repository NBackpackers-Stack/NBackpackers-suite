import React, { useState } from 'react';
import saveRecci from '@/services/recci.services';
import imageCompression from 'browser-image-compression';
export default function useRecciTour() {
    const [formData, setFormData] = useState({
        schoolName: '',
        coordinatorName: '',
        travelDate: '',
        location: '',
    });

    const [expandedCategory, setExpandedCategory] = useState<string | null>("Location");
    const [categoryData, setCategoryData] = useState<Record<string, Record<string, any>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryFieldChange = async (category: string, field: string, value: any) => {

        //image compression
        if (value instanceof File) {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            }

            const compressedFile = await imageCompression(value, options);
            value = compressedFile;
        }

        //end of compression
        setCategoryData(prev => ({
            ...prev,

            [category]: {
                ...(prev[category] || {}),
                [field]: value
            }
        }));
    };

    const toggleCategory = (category: string) => {
        setExpandedCategory(prev => prev === category ? null : category);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log("Category Data", categoryData);

        try {
            const formDataPayload = new FormData();

            // Append core fields
            for (const key in formData) {
                formDataPayload.append(key, formData[key as keyof typeof formData]);
            }

            // Append category data
            for (const category in categoryData) {
                for (const field in categoryData[category]) {
                    const value = categoryData[category][field];
                    const formKey = `${category}[${field}]`;
                    if (value instanceof File) {
                        formDataPayload.append(formKey, value);
                    } else {
                        formDataPayload.append(formKey, value);
                    }
                }
            }

            const response = await saveRecci(formDataPayload);
            if (response?.success) {
                alert('RECCI Tour Request Submitted Successfully!');
                setFormData({ schoolName: '', coordinatorName: '', travelDate: '', location: '' });
                setCategoryData({});
            } else {
                alert('Failed to submit RECCI Tour Request.');
            }
        } catch (error) {
            console.error("Error submitting RECCI Form:", error);
            alert('An error occurred while saving.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        expandedCategory,
        categoryData,
        isSubmitting,
        handleChange,
        handleCategoryFieldChange,
        toggleCategory,
        handleSubmit,
    };
}
