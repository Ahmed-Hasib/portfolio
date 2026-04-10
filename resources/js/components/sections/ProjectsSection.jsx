import { motion } from 'framer-motion';
import { useDeferredValue, useMemo, useState } from 'react';
import EmptyState from '../common/EmptyState';
import SectionHeading from '../common/SectionHeading';
import ProjectCard from './projects/ProjectCard';
import ProjectDetailsModal from './projects/ProjectDetailsModal';
import ProjectsFilters from './projects/ProjectsFilters';

const reveal = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export default function ProjectsSection({ projects }) {
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeTechnology, setActiveTechnology] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const deferredCategory = useDeferredValue(activeCategory);
    const deferredTechnology = useDeferredValue(activeTechnology);

    const orderedProjects = useMemo(
        () =>
            [...projects].sort((left, right) => {
                const featuredDifference =
                    Number(right.featured) - Number(left.featured);

                if (featuredDifference !== 0) {
                    return featuredDifference;
                }

                const sortDifference =
                    (left.sort_order ?? Number.MAX_SAFE_INTEGER) -
                    (right.sort_order ?? Number.MAX_SAFE_INTEGER);

                if (sortDifference !== 0) {
                    return sortDifference;
                }

                return left.title.localeCompare(right.title);
            }),
        [projects],
    );

    const categories = useMemo(
        () =>
            [
                ...new Set(
                    orderedProjects
                        .map((project) => project.category)
                        .filter(Boolean),
                ),
            ].sort((left, right) => left.localeCompare(right)),
        [orderedProjects],
    );

    const technologies = useMemo(
        () =>
            [
                ...new Set(
                    orderedProjects.flatMap(
                        (project) => project.tech_stack ?? [],
                    ),
                ),
            ].sort((left, right) => left.localeCompare(right)),
        [orderedProjects],
    );

    const filteredProjects = useMemo(
        () =>
            orderedProjects.filter((project) => {
                const matchesCategory =
                    deferredCategory === 'All' ||
                    project.category === deferredCategory;
                const matchesTechnology =
                    deferredTechnology === 'All' ||
                    (project.tech_stack ?? []).includes(deferredTechnology);

                return matchesCategory && matchesTechnology;
            }),
        [deferredCategory, deferredTechnology, orderedProjects],
    );

    const featuredProjects = filteredProjects.filter(
        (project) => project.featured,
    );
    const archiveProjects = filteredProjects.filter(
        (project) => !project.featured,
    );
    const hasActiveFilters =
        activeCategory !== 'All' || activeTechnology !== 'All';

    return (
        <motion.section {...reveal} id="projects" className="mt-8">
            <SectionHeading
                eyebrow="Projects"
                title="Work is organized into a featured-first showcase so visitors can evaluate product thinking, technical range, and implementation credibility quickly."
                description="Featured projects lead the section, filters make the archive easier to explore, and each card opens a focused project view with role, stack, links, and delivery context."
            />

            {projects.length === 0 ? (
                <div className="mt-6">
                    <EmptyState
                        title="No projects published yet"
                        description="Project cards will appear here once content is available from the API."
                    />
                </div>
            ) : (
                <>
                    <ProjectsFilters
                        categories={categories}
                        technologies={technologies}
                        activeCategory={activeCategory}
                        activeTechnology={activeTechnology}
                        totalCount={projects.length}
                        resultsCount={filteredProjects.length}
                        hasActiveFilters={hasActiveFilters}
                        onCategoryChange={setActiveCategory}
                        onTechnologyChange={setActiveTechnology}
                        onReset={() => {
                            setActiveCategory('All');
                            setActiveTechnology('All');
                        }}
                    />

                    {featuredProjects.length > 0 ? (
                        <div className="mt-6">
                            <div className="flex flex-wrap items-end justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                        Featured Work
                                    </p>
                                    <p className="mt-2 max-w-2xl text-sm leading-7 text-ink-soft">
                                        Stronger portfolio pieces stay at the
                                        top so recruiters can scan the most
                                        important work first.
                                    </p>
                                </div>
                                <p className="pill">
                                    {featuredProjects.length} featured project
                                    {featuredProjects.length === 1 ? '' : 's'}
                                </p>
                            </div>
                            <div className="mt-4 grid gap-5 xl:grid-cols-2">
                                {featuredProjects.map((project) => (
                                    <ProjectCard
                                        key={project.slug}
                                        project={project}
                                        onPreview={setSelectedProject}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {archiveProjects.length > 0 ? (
                        <div className="mt-8">
                            <div className="flex flex-wrap items-end justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                        More Projects
                                    </p>
                                    <p className="mt-2 max-w-2xl text-sm leading-7 text-ink-soft">
                                        Supporting work stays available in a
                                        clean responsive grid without competing
                                        with the flagship case studies.
                                    </p>
                                </div>
                                <p className="pill">
                                    {archiveProjects.length} additional project
                                    {archiveProjects.length === 1 ? '' : 's'}
                                </p>
                            </div>
                            <div className="mt-4 grid gap-5 md:grid-cols-2">
                                {archiveProjects.map((project) => (
                                    <ProjectCard
                                        key={project.slug}
                                        project={project}
                                        onPreview={setSelectedProject}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {filteredProjects.length === 0 ? (
                        <div className="mt-6">
                            <EmptyState
                                title="No projects match the current filters"
                                description="Try a different technology or category to explore the rest of the work."
                            />
                        </div>
                    ) : null}

                    <ProjectDetailsModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                </>
            )}
        </motion.section>
    );
}
