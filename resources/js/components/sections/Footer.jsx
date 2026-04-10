export default function Footer({ fullName, socialLinks }) {
    return (
        <footer className="flex flex-col gap-4 px-1 py-10 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
            <p>
                {fullName ?? 'Hasib Rahman'} portfolio is powered by a modular
                React frontend and Laravel APIs.
            </p>

            <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                    <a
                        key={link.platform_name}
                        href={link.url}
                        className="nav-link"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {link.platform_name}
                    </a>
                ))}
            </div>
        </footer>
    );
}
