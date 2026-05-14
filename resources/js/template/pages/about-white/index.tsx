import Contact from "@/components/common/Contact2";
import Education from "@/components/common/Education";
import Facts from "@/components/common/Facts";
import Pricing from "@/components/common/Pricing";
import Services from "@/components/common/Services";
import Skills from "@/components/common/Skills";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { Link } from "react-router-dom";

import MetaComponent from "@/components/common/Metacomponent";

const metadata = {
  title:
    "About || Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
};
export default function AboutPageWhite() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="tmp-white-version">
        <Header1 />
        <div className="breadcrumb-area breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h1 className="title split-collab">About Me</h1>
                  <ul className="page-list">
                    <li className="tmp-breadcrumb-item">
                      <Link to={`/`}>Home</Link>
                    </li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item active">About Me</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Services isLight />
        <Skills parentClass="tmp-skill-area tmp-section-gapBottom" />
        <Facts />
        <Education />
        <Pricing />
        <Contact parentClass="get-in-touch-area tmp-section-gapBottom tmp-section-gapTop" />
        <Footer1 />
      </div>
    </>
  );
}
