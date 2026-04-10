export default function Badge({ children, className = '', tone = 'default' }) {
    const toneClassName = {
        default: 'pill',
        accent: 'section-label',
    }[tone];

    return (
        <span className={[toneClassName, className].filter(Boolean).join(' ')}>
            {children}
        </span>
    );
}
