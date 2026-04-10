import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function parseMetricValue(value) {
    const normalizedValue = String(value ?? '');
    const match = normalizedValue.match(/^(\d+)(.*)$/);

    if (!match) {
        return {
            numericValue: null,
            suffix: normalizedValue,
        };
    }

    return {
        numericValue: Number.parseInt(match[1], 10),
        suffix: match[2],
    };
}

export default function AnimatedCounter({ value, className = '' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.7 });
    const prefersReducedMotion = useReducedMotion();
    const { numericValue, suffix } = parseMetricValue(value);
    const [displayValue, setDisplayValue] = useState(() => {
        if (numericValue === null) {
            return String(value ?? '');
        }

        return prefersReducedMotion ? `${numericValue}${suffix}` : `0${suffix}`;
    });

    useEffect(() => {
        if (numericValue === null) {
            setDisplayValue(String(value ?? ''));
            return undefined;
        }

        if (prefersReducedMotion || !isInView) {
            setDisplayValue(
                isInView ? `${numericValue}${suffix}` : `0${suffix}`,
            );
            return undefined;
        }

        const controls = animate(0, numericValue, {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            onUpdate(nextValue) {
                setDisplayValue(`${Math.round(nextValue)}${suffix}`);
            },
        });

        return () => {
            controls.stop();
        };
    }, [isInView, numericValue, prefersReducedMotion, suffix, value]);

    return (
        <motion.span ref={ref} className={className}>
            {displayValue}
        </motion.span>
    );
}
