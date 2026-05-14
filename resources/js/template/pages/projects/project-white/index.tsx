import Copyright from "@/components/footers/Copyright";
import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Projects from "@/components/projects/Projects";
import { Link } from "react-router-dom";

import MetaComponent from "@/components/common/Metacomponent";

const metadata = {
  title:
    "Project || Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
};
export default function ProjectPageWhite() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="tmp-white-version">
        <div className="project inner">
          <Header1 />
          <div className="breadcrumb-area breadcrumb-bg">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-inner text-center">
                    <h1 className="title split-collab">Project</h1>
                    <ul className="page-list">
                      <li className="tmp-breadcrumb-item">
                        <Link to={`/`}>Home</Link>
                      </li>
                      <li className="icon">
                        <i className="fa-solid fa-angle-right" />
                      </li>
                      <li className="tmp-breadcrumb-item active">Project</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Projects isLight />
          <Footer3 />
          <Copyright />
        </div>
      </div>
    </>
  );
}
