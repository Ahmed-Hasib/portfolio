import BlogDetails from "@/components/blog/BlogDetails";
import Copyright from "@/components/footers/Copyright";
import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import { allBlogs } from "@/data/blogs";
import { Link, useParams } from "react-router-dom";

import MetaComponent from "@/components/common/Metacomponent";

const metadata = {
  title:
    "Blog Details || Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
};
export default function BlogDetailsPage() {
  const params = useParams();
  const { slug } = params;
  const blog = allBlogs.find((blog) => blog.slug == slug) || allBlogs[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <div className="breadcrumb-area breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-center">
                <h1 className="title split-collab">{blog.title}</h1>
                <ul className="page-list">
                  <li className="tmp-breadcrumb-item">
                    <Link to={`/`}>Home</Link>
                  </li>
                  <li className="icon">
                    <i className="fa-solid fa-angle-right" />
                  </li>
                  <li className="tmp-breadcrumb-item active">Blog Details</li>
                </ul>
                {/* <div class="circle-1"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlogDetails blog={blog} />
      <Footer3 />
      <Copyright />
    </>
  );
}
