import Copyright from "@/components/footers/Copyright";
import Footer2 from "@/components/footers/Footer2";
import Header1 from "@/components/headers/Header1";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { Link, useParams } from "react-router-dom";

import MetaComponent from "@/components/common/Metacomponent";
import usePortfolioContent from "../../../../hooks/usePortfolioContent";

const metadata = {
  title:
    "Project Details || Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
};
export default function ProjectDetailsPage() {
  const params = useParams();
  const { slug } = params;
  const { projects, status } = usePortfolioContent();
  const portfolioItem =
    projects.find((project) => project.slug == slug) || projects[0];
  const pageTitle = portfolioItem?.title || "Project Details";

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <div className="breadcrumb-area breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <h1 className="title split-collab">{pageTitle}</h1>
                <ul className="page-list">
                  <li className="tmp-breadcrumb-item">
                    <Link to={`/`}>Home</Link>
                  </li>
                  <li className="icon">
                    <i className="fa-solid fa-angle-right" />
                  </li>
                  <li className="tmp-breadcrumb-item active">
                    Project Details
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProjectDetails portfolioItem={portfolioItem} isLoading={status === "loading"} />
      <Footer2 />
      <Copyright />
    </>
  );
}
