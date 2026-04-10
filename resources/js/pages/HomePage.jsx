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
    const yearsOfExperience = calculateYearsOfExperience(experiences);

    return [
        {
            value: yearsOfExperience,
            label: 'years building production-ready web products',
        },
        {
            value: `${projects.length}`,
            label: 'projects currently showcased in the portfolio',
        },
        {
            value: `${skills.length}+${socialLinks.length}`,
            label: 'core technologies and active social channels',
        },
    ];
}

function calculateYearsOfExperience(experiences) {
    if (experiences.length === 0) {
        return '3+';
    }

    const startYears = experiences
        .map((experience) => {
            const startDate = experience.start_date;

            if (!startDate) {
                return null;
            }

            return Number.parseInt(startDate.slice(0, 4), 10);
        })
        .filter((year) => Number.isFinite(year));

    if (startYears.length === 0) {
        return '3+';
    }

    const earliestYear = Math.min(...startYears);
    const currentYear = new Date().getFullYear();

    return `${Math.max(1, currentYear - earliestYear)}+`;
}

function buildRoleHighlights(profile, skills) {
    const primarySkills = skills.slice(0, 3).map((skill) => skill.name);

    return [
        profile?.designation ?? 'Full-Stack Laravel and React Developer',
        'Designing scalable Laravel API architectures',
        `Shipping premium interfaces with ${primarySkills[1] ?? 'React'}`,
        `Building product systems around ${primarySkills[0] ?? 'Laravel'}`,
    ];
}

function buildCurrentFocus(skills) {
    const focusSkills = skills.slice(0, 3).map((skill) => skill.name);

    if (focusSkills.length === 0) {
        return 'Laravel architecture and premium frontend delivery';
    }

    return `${focusSkills.join(', ')}, and product-minded execution`;
}

function buildTechnologiesSummary(skills) {
    const names = skills.slice(0, 4).map((skill) => skill.name);

    return names.length > 0
        ? names.join(' / ')
        : 'Laravel / React / MySQL / Tailwind CSS';
}

function buildPersonalHighlights({
    yearsOfExperience,
    currentFocus,
    projects,
    experiences,
}) {
    return [
        {
            title: `${yearsOfExperience} of experience`,
            description:
                'Hands-on delivery across backend architecture, frontend implementation, and production-focused execution.',
        },
        {
            title: 'Current focus',
            description: currentFocus,
        },
        {
            title: `${projects.length} showcased projects`,
            description:
                'A curated portfolio of shipped work, live product thinking, and implementation detail.',
        },
        {
            title: `${experiences.length} structured roles`,
            description:
                'Experience entries include summaries and detailed responsibilities for a clearer hiring narrative.',
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
    const yearsOfExperience = calculateYearsOfExperience(experiences);
    const roleHighlights = buildRoleHighlights(profile, skills);
    const currentFocus = buildCurrentFocus(skills);
    const technologiesSummary = buildTechnologiesSummary(skills);
    const personalHighlights = buildPersonalHighlights({
        yearsOfExperience,
        currentFocus,
        projects,
        experiences,
    });
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
                        roleHighlights={roleHighlights}
                        yearsOfExperience={yearsOfExperience}
                        currentFocus={currentFocus}
                    />
                    <AboutSection
                        profile={profile}
                        yearsOfExperience={yearsOfExperience}
                        currentFocus={currentFocus}
                        technologiesSummary={technologiesSummary}
                        personalHighlights={personalHighlights}
                    />
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
