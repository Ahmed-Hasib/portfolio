import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';
import EducationSection from '../components/sections/EducationSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import GallerySection from '../components/sections/GallerySection';
import HeroSection from '../components/sections/HeroSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import SkillsSection from '../components/sections/SkillsSection';
import StatusPanel from '../components/common/StatusPanel';
import usePortfolioContent from '../hooks/usePortfolioContent';
import PortfolioLayout from '../layouts/PortfolioLayout';

function buildNavigation() {
    return [
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Experience', href: '#experience' },
        { label: 'Education', href: '#education' },
        { label: 'Projects', href: '#projects' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Contact', href: '#contact' },
    ];
}

function buildMetrics({ skills, experiences, projects, socialLinks }) {
    return [
        {
            value: `${skills.length}`,
            label: 'skills tracked in the backend',
        },
        {
            value: `${experiences.length}`,
            label: 'experience entries with responsibilities',
        },
        {
            value: `${projects.length}/${socialLinks.length}`,
            label: 'projects and social platforms available',
        },
    ];
}

export default function HomePage() {
    const {
        profile,
        skills,
        experiences,
        educations,
        projects,
        galleries,
        socialLinks,
        status,
        error,
    } = usePortfolioContent();

    const navigationItems = buildNavigation();
    const metrics = buildMetrics({
        skills,
        experiences,
        projects,
        socialLinks,
    });

    return (
        <PortfolioLayout
            brand={`${profile?.full_name?.split(' ')[0] ?? 'Hasib'}Portfolio`}
            navigationItems={navigationItems}
            socialLinks={socialLinks}
            fullName={profile?.full_name}
        >
            {status === 'loading' ? (
                <StatusPanel
                    title="Loading portfolio content"
                    description="The frontend is fetching profile, skills, experience, education, projects, gallery items, and social links from the Laravel API."
                />
            ) : null}

            {status === 'error' ? (
                <StatusPanel
                    title="Unable to load portfolio data"
                    description={error}
                />
            ) : null}

            {status === 'success' ? (
                <>
                    <HeroSection
                        profile={profile}
                        socialLinks={socialLinks}
                        metrics={metrics}
                        skills={skills}
                        projects={projects}
                    />
                    <AboutSection profile={profile} />
                    <SkillsSection skills={skills} />
                    <ExperienceSection experiences={experiences} />
                    <EducationSection educations={educations} />
                    <ProjectsSection projects={projects} />
                    <GallerySection galleries={galleries} />
                    <ContactSection profile={profile} />
                </>
            ) : null}
        </PortfolioLayout>
    );
}
