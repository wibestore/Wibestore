import { useState, useEffect, useRef } from 'react';

/**
 * useAnimatedCounter - Animates a number from 0 to target value
 * Uses IntersectionObserver to trigger animation when element is visible
 * @param {number} target - The target number to count to
 * @param {number} duration - Animation duration in ms (default 2000)
 * @param {string} suffix - String to append (e.g., '+', '%')
 * @returns {{ ref, displayValue }}
 */
export function useAnimatedCounter(target, duration = 2000, suffix = '') {
    const [displayValue, setDisplayValue] = useState('0');
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateValue(0, target, duration, suffix, setDisplayValue);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [target, duration, suffix, hasAnimated]);

    return { ref, displayValue };
}

function animateValue(start, end, duration, suffix, setter) {
    const startTime = performance.now();
    const isPercentage = typeof end === 'string' && end.includes('%');
    const numericEnd = parseFloat(String(end).replace(/[^0-9.]/g, ''));

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(eased * numericEnd);

        if (numericEnd >= 1000) {
            setter(currentValue.toLocaleString() + suffix);
        } else {
            setter(currentValue + suffix);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Set final value exactly
            if (numericEnd >= 1000) {
                setter(numericEnd.toLocaleString() + suffix);
            } else {
                setter(numericEnd + suffix);
            }
        }
    }

    requestAnimationFrame(update);
}

export default useAnimatedCounter;
