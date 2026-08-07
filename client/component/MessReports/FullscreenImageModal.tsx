import React from 'react';

interface FullscreenImageModalProps {
    imageUrl: string | null;
    onClose: () => void;
}

export const FullscreenImageModal: React.FC<FullscreenImageModalProps> = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <button 
                className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all z-[60]"
                onClick={(e) => { e.stopPropagation(); onClose(); }}
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <img 
                src={imageUrl} 
                alt="Fullscreen view" 
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl relative z-50"
                onClick={(e) => e.stopPropagation()} 
            />
        </div>
    );
};
