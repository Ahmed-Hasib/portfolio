import Appointment from "./Appointment";

const onlineProjectImages = [
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
];

function resolveProjectImage(project, index = 0) {
  if (project?.thumbnail?.startsWith("http")) {
    return project.thumbnail;
  }

  return onlineProjectImages[index % onlineProjectImages.length];
}

function stripHtml(value) {
  if (!value) {
    return "";
  }

  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

type ProjectDetailsProps = {
  portfolioItem?: {
    title?: string;
    thumbnail?: string;
    description?: string;
    full_description?: string;
    category?: string;
    role?: string;
    tech_stack?: string[];
    live_url?: string;
    github_url?: string;
  };
  isLoading?: boolean;
}

export default function ProjectDetails({
  portfolioItem,
  isLoading = false,
}: ProjectDetailsProps) {
  if (!portfolioItem) {
    return (
      <div className="project-details-area-wrapper tmp-section-gap">
        <div className="container">
          <p className="docs">
            {isLoading ? "Loading project details..." : "No project found."}
          </p>
        </div>
      </div>
    );
  }

  const image = resolveProjectImage(portfolioItem);
  const description = stripHtml(
    portfolioItem.full_description || portfolioItem.description
  );
  const shortDescription = stripHtml(portfolioItem.description);
  const stack = portfolioItem.tech_stack?.length
    ? portfolioItem.tech_stack
    : [portfolioItem.category || "Web Application"];

  return (
    <div className="project-details-area-wrapper tmp-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="project-details-thumnail-wrap">
              <img
                loading="lazy"
                alt="thumbnail"
                src={image}
                width={1290}
                height={560}
              />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="project-details-content-wrap">
              <h2 className="title">{portfolioItem.title}</h2>
              <p className="docs">
                {description ||
                  "This project is managed from the admin panel and will show more details as content is added."}
              </p>
              {shortDescription && shortDescription !== description ? (
                <p className="docs">{shortDescription}</p>
              ) : null}
              <div className="check-box-wrap">
                <ul>
                  {stack.slice(0, 5).map((technology) => (
                    <li key={technology}>
                      <h4 className="check-box-item">
                        <span>
                          <i className="fa-solid fa-circle-check" />
                        </span>
                        {technology}
                      </h4>
                    </li>
                  ))}
                </ul>
              </div>
              <h2 className="mini-title">
                {portfolioItem.role || "Project Scope"}
              </h2>
              <p className="docs">
                {portfolioItem.category
                  ? `Category: ${portfolioItem.category}`
                  : "Built as a portfolio project with a focus on practical implementation and presentation."}
              </p>
              <div className="project-details-swiper-wrapper">
                <div className="swiper project-details-swiper">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="project-details-img">
                        <img
                          loading="lazy"
                          alt="swiper-img"
                          src={onlineProjectImages[0]}
                          width={410}
                          height={295}
                        />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="project-details-img">
                        <img
                          loading="lazy"
                          alt="swiper-img"
                          src={onlineProjectImages[1]}
                          width={410}
                          height={295}
                        />
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="project-details-img">
                        <img
                          loading="lazy"
                          alt="swiper-img"
                          src={onlineProjectImages[2]}
                          width={410}
                          height={295}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-details-swiper-btn">
                  <div className="project-swiper-button-prev">
                    <span>
                      <i className="fa-solid fa-arrow-left" />
                    </span>
                    Previous
                  </div>
                  <div className="project-swiper-button-next">
                    Next{" "}
                    <span>
                      <i className="fa-solid fa-arrow-right" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Tpm Get In touch start */}
            <Appointment />
            {/* Tpm Get In touch End */}
          </div>
          <div className="col-lg-4">
            <div className="signle-side-bar project-details-area tmponhover">
              <div className="header">
                <h3 className="title">Project Details</h3>
              </div>
              <div className="body">
                <div className="project-details-info">
                  Name: <span>{portfolioItem.title}</span>
                </div>
                <div className="project-details-info">
                  Role: <span>{portfolioItem.role || "Developer"}</span>
                </div>
                <div className="project-details-info">
                  Category: <span>{portfolioItem.category || "Portfolio"}</span>
                </div>
                <div className="project-details-info">
                  Tags: <span>{stack.join(", ")}</span>
                </div>
                {portfolioItem.live_url ? (
                  <div className="project-details-info">
                    Live: <span>{portfolioItem.live_url}</span>
                  </div>
                ) : null}
                {portfolioItem.github_url ? (
                  <div className="project-details-info">
                    Code: <span>{portfolioItem.github_url}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
