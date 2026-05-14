import Copyright from "@/components/footers/Copyright";
import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import ServiceDetails from "@/components/services/ServiceDetails";
import { allServices } from "@/data/services";
import { Link, useParams } from "react-router-dom";

import MetaComponent from "@/components/common/Metacomponent";

const metadata = {
  title:
    "ServiceDetails || Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
};
export default function ServiceDetailsPage() {
  const params = useParams();
  const { slug } = params;
  const serviceItem =
    allServices.find((blog) => blog.slug == slug) || allServices[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <div className="breadcrumb-area breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <h1 className="title split-collab">{serviceItem.title}</h1>
                <ul className="page-list">
                  <li className="tmp-breadcrumb-item">
                    <Link to={`/`}>Home</Link>
                  </li>
                  <li className="icon">
                    <i className="fa-solid fa-angle-right" />
                  </li>
                  <li className="tmp-breadcrumb-item active">
                    Service Details
                  </li>
                </ul>
                {/* <div class="circle-1"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ServiceDetails serviceItem={serviceItem} />
      <Footer3 />
      <Copyright />
    </>
  );
}
