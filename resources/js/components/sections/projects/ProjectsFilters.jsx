import Button from '../../common/Button';

export default function ProjectsFilters({
    categories,
    technologies,
    activeCategory,
    activeTechnology,
    totalCount,
    resultsCount,
    hasActiveFilters,
    onCategoryChange,
    onTechnologyChange,
    onReset,
}) {
    return (
        <div className="mt-6 rounded-[2rem] border border-black/8 bg-white/76 p-5 shadow-[0_24px_80px_-45px_rgba(16,34,41,0.32)] backdrop-blur sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                        Explore the project archive
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-soft">
                        {hasActiveFilters
                            ? `Showing ${resultsCount} of ${totalCount} projects for the current filters.`
                            : `Showing all ${totalCount} projects with featured work prioritized first.`}
                    </p>
                </div>

                {hasActiveFilters ? (
                    <Button
                        variant="secondary"
                        className="px-4 py-2 text-xs"
                        onClick={onReset}
                    >
                        Clear filters
                    </Button>
                ) : null}
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div className="rounded-[1.75rem] border border-black/8 bg-white/82 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                        Filter by category
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <Button
                            variant={
                                activeCategory === 'All'
                                    ? 'primary'
                                    : 'secondary'
                            }
                            className="px-4 py-2 text-xs"
                            onClick={() => onCategoryChange('All')}
                        >
                            All categories
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={
                                    activeCategory === category
                                        ? 'primary'
                                        : 'secondary'
                                }
                                className="px-4 py-2 text-xs"
                                onClick={() => onCategoryChange(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="rounded-[1.75rem] border border-black/8 bg-white/82 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                        Filter by technology
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <Button
                            variant={
                                activeTechnology === 'All'
                                    ? 'primary'
                                    : 'secondary'
                            }
                            className="px-4 py-2 text-xs"
                            onClick={() => onTechnologyChange('All')}
                        >
                            All technologies
                        </Button>
                        {technologies.map((technology) => (
                            <Button
                                key={technology}
                                variant={
                                    activeTechnology === technology
                                        ? 'primary'
                                        : 'secondary'
                                }
                                className="px-4 py-2 text-xs"
                                onClick={() => onTechnologyChange(technology)}
                            >
                                {technology}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-ink-soft">
                <span className="rounded-full border border-black/8 bg-shell px-3 py-2">
                    Category: {activeCategory}
                </span>
                <span className="rounded-full border border-black/8 bg-shell px-3 py-2">
                    Technology: {activeTechnology}
                </span>
            </div>
        </div>
    );
}
