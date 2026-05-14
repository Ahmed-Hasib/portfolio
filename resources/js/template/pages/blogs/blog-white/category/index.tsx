import Blogs from "@/components/blog/Blogs";
import Copyright from "@/components/footers/Copyright";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { allBlogs } from "@/data/blogs";
import { Link, useParams } from "react-router-dom";

import { slugify, unslugify } from "@/utlis/slugify";

import MetaComponent from "@/components/common/Metacomponent";

const metadata = {
  title:
    "Blog || Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
};
export default function BlogCategoryPageWhite() {
  const params = useParams();
  const { category } = params;
  const blogs = allBlogs.filter(
    (blog) =>
      "categories" in blog &&
      blog.categories?.some((el) => slugify(el) == category)
  );

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
                  <h1 className="title split-collab">
                    {unslugify(category ?? "Demo")}
                  </h1>
                  <ul className="page-list">
                    <li className="tmp-breadcrumb-item">
                      <Link to={`/`}>Home</Link>
                    </li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item">Blog</li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item active">Category</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Blogs
          allBlogs={blogs.filter(
            (
              blog
            ): blog is {
              id: number;
              animationOrder: string;
              imageSrc: string;
              altText: string;
              title: string;
              description: string;
              tags: string[];
              categories: string[];
              slug: string;
            } => "categories" in blog && "description" in blog && "tags" in blog
          )}
          isLight
        />
        <Footer1 />
        <Copyright />
      </div>
    </>
  );
}
