import React from 'react';

const AnimatedLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-md">
            <img src="/load-2.gif" alt="Loading..." className="w-32 h-32 object-contain" />
        </div>
    );
};

export default AnimatedLoader;
