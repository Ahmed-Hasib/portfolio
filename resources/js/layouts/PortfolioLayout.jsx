import Footer from '../components/sections/Footer';
import Navbar from '../components/sections/Navbar';

export default function PortfolioLayout({
    brand,
    navigationItems,
    socialLinks,
    fullName,
    children,
}) {
    return (
        <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(15,118,110,0.14),transparent_52%)]" />

            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 lg:px-10 lg:py-8">
                <Navbar brand={brand} items={navigationItems} />

                <main className="flex-1 py-10 lg:py-16">{children}</main>

                <Footer fullName={fullName} socialLinks={socialLinks} />
            </div>
        </div>
    );
}
