import { blogData4 } from "@/data/blogs";

import { Link } from "react-router-dom";
export default function Blogs3({
  parentClass = "blog-and-news-are tmp-section-gap",
  isLight = false,
}) {
  return (
    <section className={parentClass} id="blog">
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Blog and news</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Elevating Personal Branding the <br /> through Powerful Portfolios
          </h2>
        </div>
        <div className="row">
          {blogData4.map((blog) => (
            <div key={blog.id} className="col-lg-4 col-md-6 col-sm-6">
              <div
                className={`blog-card tmp-hover-link tmp-scroll-trigger tmp-fade-in ${blog.animationOrder}`}
              >
                <div className="img-box">
                  <Link
                    to={`/blog-details${isLight ? "-white" : ""}/${blog.slug}`}
                  >
                    <img
                      loading="lazy"
                      className="img-primary hidden-on-mobile"
                      alt={blog.altText}
                      width={410}
                      height={294}
                      src={blog.imageSrc}
                    />
                    <img
                      loading="lazy"
                      className="img-secondary"
                      alt={blog.altText}
                      width={410}
                      height={294}
                      src={blog.imageSrc}
                    />
                  </Link>
                  <ul className="blog-tags">
                    <li>
                      <span className="tag-icon">
                        <i className="fa-regular fa-user" />
                      </span>
                      {blog.author}
                    </li>
                    <li>
                      <span className="tag-icon">
                        <i className="fa-solid fa-calendar-days" />
                      </span>
                      {blog.date}
                    </li>
                  </ul>
                </div>
                <div className="blog-content-wrap">
                  <h3 className="blog-title v2">
                    <Link
                      className="link"
                      to={`/blog-details${isLight ? "-white" : ""}/${
                        blog.slug
                      }`}
                    >
                      {blog.title}
                    </Link>
                  </h3>
                  <Link
                    to={`/blog-details${isLight ? "-white" : ""}/${blog.slug}`}
                    className="read-more-btn v2"
                  >
                    Read More{" "}
                    <span className="read-more-icon">
                      <i className="fa-solid fa-angle-right" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
