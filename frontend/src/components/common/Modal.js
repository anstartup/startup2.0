import * as React from 'react';


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
            <div
                className={['fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'].join(' ')}
                onClick={handleBackdropClick}
            >
                <div className={['bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-6 relative w-full max-w-md mx-4'].join(' ')}
                >
                        <button
                            className={["absolute top-3 right-3 text-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"].join(' ')}
                            onClick={onClose}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;