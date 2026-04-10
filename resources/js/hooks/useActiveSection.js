import { useEffect, useState } from 'react';

export default function useActiveSection(items) {
    const [activeSection, setActiveSection] = useState(() => {
        const firstItem = items.find((item) => item.href?.startsWith('#'));

        return firstItem?.href ?? null;
    });

    useEffect(() => {
        const sectionIds = items
            .map((item) => item.href)
            .filter((href) => href?.startsWith('#'))
            .map((href) => href.slice(1));

        if (sectionIds.length === 0) {
            return undefined;
        }

        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        if (sections.length === 0) {
            return undefined;
        }

        function updateFromHash() {
            const { hash } = window.location;

            if (hash && sectionIds.includes(hash.slice(1))) {
                setActiveSection(hash);
            }
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (left, right) =>
                            right.intersectionRatio - left.intersectionRatio,
                    );

                if (visibleEntries.length === 0) {
                    return;
                }

                setActiveSection(`#${visibleEntries[0].target.id}`);
            },
            {
                rootMargin: '-22% 0px -58% 0px',
                threshold: [0.2, 0.35, 0.5, 0.7],
            },
        );

        sections.forEach((section) => observer.observe(section));
        updateFromHash();
        window.addEventListener('hashchange', updateFromHash);

        return () => {
            observer.disconnect();
            window.removeEventListener('hashchange', updateFromHash);
        };
    }, [items]);

    return activeSection;
}
