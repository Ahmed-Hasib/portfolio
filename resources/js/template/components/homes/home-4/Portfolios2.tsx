import { Link } from "react-router-dom";

const onlineProjectImages = [
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=80",
];

function resolveProjectImage(project, index) {
  if (project?.thumbnail?.startsWith("http")) {
    return project.thumbnail;
  }

  return onlineProjectImages[index % onlineProjectImages.length];
}

function buildProjectCard(project, index) {
  return {
    id: project.id ?? index,
    animationOrder: (index % 4) + 1,
    imageSrc: resolveProjectImage(project, index),
    width: 1134,
    height: 760,
    title: project.title,
    tags: project.tech_stack?.length
      ? project.tech_stack.slice(0, 3)
      : [project.category || "Web App"],
    buttonText: "View Details",
    slug: project.slug,
  };
}

export default function Portfolios2({ projects = [] }) {
  const items = projects.slice(0, 4).map(buildProjectCard);

  return (
    <section className="tmp-latest-portfolio tmp-section-gapTop">
      <div className="container">
        <div className="header-top-inner">
          <div className="section-head text-align-left">
            <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
              <span className="subtitle">Recent Portfolio</span>
            </div>
            <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
              Transforming Ideas <br />
              into Exceptional
            </h2>
          </div>
          <div className="discription-area tmp-scroll-trigger tmp-fade-in animation-order-3">
            <p className="description">
              Business consulting consultants provide expert advice and guida
              <span>businesses</span> to help them improve their performance,
              efficiency, and organizational
            </p>
          </div>
        </div>
        <div className="row g-5">
          {items.map((item) => (
            <div className="col-lg-6 col-md-6 col-12" key={item.id}>
              <div
                className={`latest-portfolio-card-style-two tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${item.animationOrder}`}
              >
                <div className="portfoli-card-img">
                  <div className="img-box v2">
                    <Link
                      to={`/portfolio-details/${item.slug}`}
                    >
                      <img
                        loading="lazy"
                        className="img-primary hidden-on-mobile"
                        alt="Blog Thumbnail"
                        src={item.imageSrc}
                        width={item.width}
                        height={item.height}
                      />
                      <img
                        loading="lazy"
                        className="img-secondary"
                        alt="Blog Thumbnail"
                        src={item.imageSrc}
                        width={item.width}
                        height={item.height}
                      />
                    </Link>
                  </div>
                </div>
                <div className="portfolio-card-content-wrap">
                  <div className="content-left">
                    <h3 className="portfolio-card-title">
                      <Link
                        to={`/portfolio-details/${item.slug}`}
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <div className="tag-items">
                      <ul>
                        {item.tags.map((tag, index) => (
                          <li key={index}>
                            <a href="#" className="tag-item">
                              {tag}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="tmp-button-here">
                    <Link
                      className="tmp-btn hover-icon-reverse radius-round btn-border btn-md"
                      to={`/portfolio-details/${item.slug}`}
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">{item.buttonText}</span>
                        <span className="btn-icon">
                          <i className="fa-sharp fa-regular fa-arrow-right" />
                        </span>
                        <span className="btn-icon">
                          <i className="fa-sharp fa-regular fa-arrow-right" />
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="see-all-btn-wrap text-center mt--60">
          <a className="tmp-btn hover-icon-reverse radius-round" href="#">
            <span className="icon-reverse-wrapper">
              <span className="btn-text">View All Portfolio</span>
              <span className="btn-icon">
                <i className="fa-sharp fa-regular fa-arrow-right" />
              </span>
              <span className="btn-icon">
                <i className="fa-sharp fa-regular fa-arrow-right" />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
