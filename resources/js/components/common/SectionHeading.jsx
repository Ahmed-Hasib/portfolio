import Badge from './Badge';

export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = 'left',
}) {
    return (
        <div
            className={[
                'max-w-3xl',
                align === 'center' ? 'mx-auto text-center' : '',
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {eyebrow ? <Badge tone="accent">{eyebrow}</Badge> : null}
            <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {title}
            </h2>
            {description ? (
                <p className="mt-4 text-base leading-8 text-ink-soft">
                    {description}
                </p>
            ) : null}
        </div>
    );
}
