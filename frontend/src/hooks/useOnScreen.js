import { useState, useEffect } from 'react';

const useOnScreen = (ref) => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // This will fire when the element's visibility changes
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    // Once visible, we don't need to observe it anymore
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref]); // Only re-run the effect if the ref changes

    return isIntersecting;
};

export default useOnScreen;