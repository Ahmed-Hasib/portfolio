import Button from './Button';
import SurfaceCard from './SurfaceCard';

export default function StatusPanel({
    title,
    description,
    actionLabel,
    onAction,
}) {
    return (
        <SurfaceCard className="px-6 py-10 text-center sm:px-8">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
                {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-ink-soft">
                {description}
            </p>
            {actionLabel && onAction ? (
                <div className="mt-6">
                    <Button onClick={onAction}>{actionLabel}</Button>
                </div>
            ) : null}
        </SurfaceCard>
    );
}
