export default function Navbar({ brand, items }) {
    return (
        <header className="surface-card sticky top-4 z-20 flex items-center justify-between px-5 py-4 lg:px-6">
            <a
                href="/"
                className="font-display text-lg font-bold tracking-tight text-ink"
            >
                {brand}
            </a>

            <nav className="hidden items-center gap-6 md:flex">
                {items.map((item) => (
                    <a key={item.label} href={item.href} className="nav-link">
                        {item.label}
                    </a>
                ))}
            </nav>
        </header>
    );
}
