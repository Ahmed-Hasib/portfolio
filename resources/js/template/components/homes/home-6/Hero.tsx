import { Link } from "react-router-dom";

function resolveAssetUrl(path) {
  if (!path) {
    return null;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `/${path.replace(/^\/+/, "")}`;
}

function stripHtml(value) {
  if (!value) {
    return "";
  }

  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default function Hero({ profile }) {
  const fullName = profile?.full_name || "";
  const designation = profile?.designation || "";
  const description = stripHtml(profile?.bio);
  const profileImage = resolveAssetUrl(profile?.profile_image);

  return (
    <div className="rpp-banner-six-area">
      <div className="container">
        <div className="banner-six-main-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-7 order-lg-2">
              <div className="banner-right-content">
                <div className="bg-benner-img-six">
                  {profileImage ? (
                    <img
                      className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                      alt={fullName}
                      src={profileImage}
                      width={531}
                      height={531}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-lg-5 order-lg-1">
              <div className="inner">
                <span className="sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                  {designation}
                </span>
                <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2">
                  {fullName}
                </h1>
                <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
                  {description}
                </p>
                <div className="button-area-banner-three tmp-scroll-trigger tmp-fade-in animation-order-4">
                  <Link
                    className="tmp-btn hover-icon-reverse radius-round"
                    to={`/portfolio-details`}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">View Portfolio</span>
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
        </div>
      </div>
      <div className="bg-left-shape">
        <img
          alt=""
          src="/assets/images/banner/bg-six-shape-left-side.png"
          width={865}
          height={900}
        />
      </div>
    </div>
  );
}
