export default function SurfaceCard({
    as: Component = 'div',
    className = '',
    children,
    ...props
}) {
    return (
        <Component
            className={['surface-card', className].filter(Boolean).join(' ')}
            {...props}
        >
            {children}
        </Component>
    );
}
