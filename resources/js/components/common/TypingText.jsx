import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const fallbackItems = ['Building polished web experiences'];

export default function TypingText({
    items,
    className = '',
    typingSpeed = 75,
    deletingSpeed = 45,
    pauseDuration = 1500,
}) {
    const prefersReducedMotion = useReducedMotion();
    const [itemIndex, setItemIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const safeItems = items.length > 0 ? items : fallbackItems;

        if (prefersReducedMotion) {
            setDisplayText(safeItems[0]);
            return undefined;
        }

        const currentItem = safeItems[itemIndex % safeItems.length];
        const nextText = isDeleting
            ? currentItem.slice(0, Math.max(0, displayText.length - 1))
            : currentItem.slice(0, displayText.length + 1);

        const isTypingComplete = !isDeleting && nextText === currentItem;
        const isDeletingComplete = isDeleting && nextText.length === 0;

        const delay = isTypingComplete
            ? pauseDuration
            : isDeleting
              ? deletingSpeed
              : typingSpeed;

        const timeoutId = window.setTimeout(() => {
            setDisplayText(nextText);

            if (isTypingComplete) {
                setIsDeleting(true);
            } else if (isDeletingComplete) {
                setIsDeleting(false);
                setItemIndex((current) => (current + 1) % safeItems.length);
            }
        }, delay);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [
        deletingSpeed,
        displayText,
        isDeleting,
        items,
        itemIndex,
        pauseDuration,
        prefersReducedMotion,
        typingSpeed,
    ]);

    return (
        <span className={className}>
            {displayText}
            {prefersReducedMotion ? null : (
                <span className="ml-1 inline-block h-[1em] w-px animate-pulse bg-current align-[-0.15em]" />
            )}
        </span>
    );
}
