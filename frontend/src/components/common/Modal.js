import * as React from 'react';


const Modal = ({ isOpen, onClose, children }) => {
    // Lock background scroll while modal is open (hook must be at top level)
    React.useEffect(() => {
        if (!isOpen) return; // only act when opening
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previous; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
            <div
                className={[
                    'fixed inset-0 z-50 flex items-start sm:items-center justify-center',
                    'bg-black/60 backdrop-blur-sm',
                    'overflow-y-auto overscroll-contain p-4'
                ].join(' ')}
                onClick={handleBackdropClick}
            >
        <div
                    className={[
            'bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-6 relative w-full',
            'max-w-md sm:max-w-lg md:max-w-2xl mx-auto',
                        'max-h-[90vh] overflow-y-auto'
                    ].join(' ')}
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