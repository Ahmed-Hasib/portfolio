import SurfaceCard from './SurfaceCard';

export default function EmptyState({ title, description }) {
    return (
        <SurfaceCard className="px-6 py-8 text-center">
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
                {title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
                {description}
            </p>
        </SurfaceCard>
    );
}
