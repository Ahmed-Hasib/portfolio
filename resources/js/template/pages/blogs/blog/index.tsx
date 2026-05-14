import Blogs from "@/components/blog/Blogs";
import Copyright from "@/components/footers/Copyright";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { Link } from "react-router-dom";

import MetaComponent from "@/components/common/Metacomponent";

const metadata = {
  title:
    "Blog || Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
};
export default function BlogPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <div className="breadcrumb-area breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <h1 className="title split-collab">Blog Classic</h1>
                <ul className="page-list">
                  <li className="tmp-breadcrumb-item">
                    <Link to={`/`}>Home</Link>
                  </li>
                  <li className="icon">
                    <i className="fa-solid fa-angle-right" />
                  </li>
                  <li className="tmp-breadcrumb-item active">Blog Classic</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Blogs />
      <Footer1 />
      <Copyright />
    </>
  );
}
