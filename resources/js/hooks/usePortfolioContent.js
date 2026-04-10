import { startTransition, useEffect, useState } from 'react';
import { getPortfolioContent } from '../services/portfolioService';

const defaultContent = {
    profile: null,
    skills: [],
    experiences: [],
    educations: [],
    projects: [],
    galleries: [],
    socialLinks: [],
};

export default function usePortfolioContent() {
    const [content, setContent] = useState(defaultContent);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function loadPortfolioContent() {
            setStatus('loading');
            setError(null);

            try {
                const nextContent = await getPortfolioContent();

                if (cancelled) {
                    return;
                }

                startTransition(() => {
                    setContent(nextContent);
                    setStatus('success');
                });
            } catch (caughtError) {
                if (cancelled) {
                    return;
                }

                const message =
                    caughtError.response?.data?.message ??
                    caughtError.message ??
                    'Unable to load portfolio content right now.';

                setError(message);
                setStatus('error');
            }
        }

        loadPortfolioContent();

        return () => {
            cancelled = true;
        };
    }, []);

    return {
        ...content,
        status,
        error,
    };
}
