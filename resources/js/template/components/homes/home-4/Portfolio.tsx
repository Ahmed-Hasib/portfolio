import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const onlineProjectImages = [
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
];

function resolveProjectImage(project, index) {
  if (project?.thumbnail?.startsWith("http")) {
    return project.thumbnail;
  }

  return onlineProjectImages[index % onlineProjectImages.length];
}

function buildPortfolioItem(project, index) {
  return {
    id: project.id ?? index,
    imageSrc: resolveProjectImage(project, index),
    width: 900,
    height: 700,
    title: project.title,
    description: project.category || "Web Application",
    categories: [project.category || "Web Application"],
    slug: project.slug,
  };
}

export default function Portfolio({ projects = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const items = useMemo(
    () => projects.slice(0, 6).map(buildPortfolioItem),
    [projects]
  );

  const categories = useMemo(
    () => ["All", ...new Set(items.flatMap((item) => item.categories))],
    [items]
  );
  const filtered = useMemo(() => {
    return activeCategory === "All"
      ? items
      : items.filter((item) =>
          item.categories.includes(activeCategory)
        );
  }, [activeCategory, items]);
  return (
    <section className="tmp-portfolio-area tmp-section-gap">
      <div className="container">
        <div className="section-head mb--60">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Latest Portfolio</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Transforming Ideas into Exceptional
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            Business consulting consultants provide expert advice and guida
            businesses to help them improve their performance, efficiency, and
            organizational
          </p>
        </div>
        <div className="latest-portfolio-tabs-area">
          <nav>
            <ul className="nav nav-tabs tmp-scroll-trigger tmp-fade-in animation-order-4">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className={`nav-link ${
                      activeCategory === category ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="tab-content bg-blur-style-three">
            <div className="tab-pane fade show active">
              <div className="row">
                {filtered.map((item) => (
                  <div className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="tmp-portfolio tmp-scroll-trigger tmp-fade-in animation-order-1">
                      <img
                        loading="lazy"
                        alt="tab-image"
                        src={item.imageSrc}
                        width={item.width}
                        height={item.height}
                      />
                      <div className="portfolio-card-content-wrap">
                        <div className="content-left">
                          <p className="portfoli-card-para">
                            {item.description}
                          </p>
                          <h3 className="portfolio-card-title animated fadeIn">
                            <Link to={`/portfolio-details/${item.slug}`}>
                              {item.title}
                            </Link>
                          </h3>
                        </div>
                        <div className="portfolio-btn">
                          <Link
                            to={`/portfolio-details/${item.slug}`}
                            className="tmp-arrow-icon-btn"
                          >
                            <div className="btn-inner">
                              <i className="tmp-icon fa-solid fa-arrow-up-right" />
                              <i className="tmp-icon-bottom fa-solid fa-arrow-up-right" />
                            </div>
                          </Link>
                        </div>
                      </div>
                      <Link
                        to={`/portfolio-details/${item.slug}`}
                        className="over_link"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
