import "../public/assets/scss/main.scss";
import "odometer/themes/odometer-theme-default.css"; // Import theme
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import HomePage from "./pages";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

// Home Pages
import { ErrorBoundary } from "react-error-boundary";
const HomePage2 = lazy(() => import("./pages/homes/index-02"));
const HomePage3 = lazy(() => import("./pages/homes/index-03"));
const HomePage4 = lazy(() => import("./pages/homes/index-04"));
const HomePage5 = lazy(() => import("./pages/homes/index-05"));
const HomePage6 = lazy(() => import("./pages/homes/index-06"));
const HomePage7 = lazy(() => import("./pages/homes/index-07"));
const HomePage8 = lazy(() => import("./pages/homes/index-08"));
const HomePage9 = lazy(() => import("./pages/homes/index-09"));
const HomePage10 = lazy(() => import("./pages/homes/index-10"));
const HomePage11 = lazy(() => import("./pages/homes/index-11"));
const HomePage12 = lazy(() => import("./pages/homes/index-12"));
const HomePage13 = lazy(() => import("./pages/homes/index-13"));
const HomePage14 = lazy(() => import("./pages/homes/index-14"));
const HomePage15 = lazy(() => import("./pages/homes/index-15"));
const HomePage16 = lazy(() => import("./pages/homes/index-16"));
const HomePage17 = lazy(() => import("./pages/homes/index-17"));
const HomePage18 = lazy(() => import("./pages/homes/index-18"));
const HomePage19 = lazy(() => import("./pages/homes/index-19"));
const HomePage20 = lazy(() => import("./pages/homes/index-20"));
const HomePage21 = lazy(() => import("./pages/homes/index-21"));
const HomePage22 = lazy(() => import("./pages/homes/index-22"));
const HomePageWhite = lazy(() => import("./pages/homes/index-white"));
const HomePage2White = lazy(() => import("./pages/homes/index-02-white"));

const HomePage4White = lazy(() => import("./pages/homes/index-04-white"));
const HomePage5White = lazy(() => import("./pages/homes/index-05-white"));
const HomePage6White = lazy(() => import("./pages/homes/index-06-white"));
const HomePage7White = lazy(() => import("./pages/homes/index-07-white"));
const HomePage8White = lazy(() => import("./pages/homes/index-08-white"));
const HomePage9White = lazy(() => import("./pages/homes/index-09-white"));
const HomePage10White = lazy(() => import("./pages/homes/index-10-white"));
const HomePage11White = lazy(() => import("./pages/homes/index-11-white"));
const HomePage12White = lazy(() => import("./pages/homes/index-12-white"));
const HomePage13White = lazy(() => import("./pages/homes/index-13-white"));
const HomePage14White = lazy(() => import("./pages/homes/index-14-white"));
const HomePage15White = lazy(() => import("./pages/homes/index-15-white"));
const HomePage16White = lazy(() => import("./pages/homes/index-16-white"));
const HomePage17White = lazy(() => import("./pages/homes/index-17-white"));
const HomePage18White = lazy(() => import("./pages/homes/index-18-white"));
const HomePage19White = lazy(() => import("./pages/homes/index-19-white"));
const HomePage20White = lazy(() => import("./pages/homes/index-20-white"));
const HomePage21White = lazy(() => import("./pages/homes/index-21-white"));
const HomePage22White = lazy(() => import("./pages/homes/index-22-white"));

// Services
const ServicePage = lazy(() => import("./pages/services/service"));
const ServiceDetailsPage = lazy(
  () => import("./pages/services/service-details")
);
const ServicePageWhite = lazy(() => import("./pages/services/service-white"));
const ServiceDetailsPageWhite = lazy(
  () => import("./pages/services/service-details-white")
);

// Blogs
const BlogPage = lazy(() => import("./pages/blogs/blog"));
const BlogDetailsPage = lazy(() => import("./pages/blogs/blog-details"));
const BlogCategoryPage = lazy(() => import("./pages/blogs/blog/category"));
const BlogTagPage = lazy(() => import("./pages/blogs/blog/tag"));
const BlogPageWhite = lazy(() => import("./pages/blogs/blog-white"));
const BlogDetailsPageWhite = lazy(
  () => import("./pages/blogs/blog-details-white")
);
const BlogCategoryPageWhite = lazy(
  () => import("./pages/blogs/blog-white/category")
);
const BlogTagPageWhite = lazy(() => import("./pages/blogs/blog-white/tag"));

// Projects
const ProjectPage = lazy(() => import("./pages/projects/project"));
const ProjectDetailsPage = lazy(
  () => import("./pages/projects/project-details")
);
const ProjectPageWhite = lazy(() => import("./pages/projects/project-white"));
const ProjectDetailsPageWhite = lazy(
  () => import("./pages/projects/project-details-white")
);

// Contact & About
const ContactPage = lazy(() => import("./pages/contact"));
const ContactPageWhite = lazy(() => import("./pages/contact-white"));
const AboutPage = lazy(() => import("./pages/about"));
const AboutPageWhite = lazy(() => import("./pages/about-white"));
const HomePage3Whiite = lazy(() => import("./pages/homes/index-03-white"));

// Scroll behavior (optional to lazy if critical)
import ScrollTopBehaviour from "./components/common/ScrollToTopBehaviour";
import GlobaleffectProvider from "./components/common/GlobaleffectProvider";
import { ModalUIProvider } from "./context/ModalUIContext";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        // autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <h2>Something went wrong.</h2>
            <pre style={{ color: "red" }}>{error.message}</pre>
            <button
              className="btn btn-primary mt-3"
              onClick={resetErrorBoundary}
            >
              Try again
            </button>
          </div>
        )}
      >
        <Suspense
          fallback={
            <div
              className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white"
              style={{ zIndex: 1050 }}
            >
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <ModalUIProvider>
            <Routes>
              <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="index-02" element={<HomePage2 />} />
                <Route path="index-03" element={<HomePage3 />} />
                <Route path="index-04" element={<HomePage4 />} />
                <Route path="index-05" element={<HomePage5 />} />
                <Route path="index-06" element={<HomePage6 />} />
                <Route path="index-07" element={<HomePage7 />} />
                <Route path="index-08" element={<HomePage8 />} />
                <Route path="index-09" element={<HomePage9 />} />
                <Route path="index-10" element={<HomePage10 />} />
                <Route path="index-11" element={<HomePage11 />} />
                <Route path="index-12" element={<HomePage12 />} />
                <Route path="index-13" element={<HomePage13 />} />
                <Route path="index-14" element={<HomePage14 />} />
                <Route path="index-15" element={<HomePage15 />} />
                <Route path="index-16" element={<HomePage16 />} />
                <Route path="index-17" element={<HomePage17 />} />
                <Route path="index-18" element={<HomePage18 />} />
                <Route path="index-19" element={<HomePage19 />} />
                <Route path="index-20" element={<HomePage20 />} />
                <Route path="index-21" element={<HomePage21 />} />
                <Route path="index-22" element={<HomePage22 />} />
                //white demo pages
                <Route path="index-white" element={<HomePageWhite />} />
                <Route path="index-02-white" element={<HomePage2White />} />
                <Route path="index-03-white" element={<HomePage3Whiite />} />
                <Route path="index-04-white" element={<HomePage4White />} />
                <Route path="index-05-white" element={<HomePage5White />} />
                <Route path="index-06-white" element={<HomePage6White />} />
                <Route path="index-07-white" element={<HomePage7White />} />
                <Route path="index-08-white" element={<HomePage8White />} />
                <Route path="index-09-white" element={<HomePage9White />} />
                <Route path="index-10-white" element={<HomePage10White />} />
                <Route path="index-11-white" element={<HomePage11White />} />
                <Route path="index-12-white" element={<HomePage12White />} />
                <Route path="index-13-white" element={<HomePage13White />} />
                <Route path="index-14-white" element={<HomePage14White />} />
                <Route path="index-15-white" element={<HomePage15White />} />
                <Route path="index-16-white" element={<HomePage16White />} />
                <Route path="index-17-white" element={<HomePage17White />} />
                <Route path="index-18-white" element={<HomePage18White />} />
                <Route path="index-19-white" element={<HomePage19White />} />
                <Route path="index-20-white" element={<HomePage20White />} />
                <Route path="index-21-white" element={<HomePage21White />} />
                <Route path="index-22-white" element={<HomePage22White />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="about-white" element={<AboutPageWhite />} />
                <Route path="service" element={<ServicePage />} />
                <Route
                  path="service-details/:slug"
                  element={<ServiceDetailsPage />}
                />
                <Route path="blog" element={<BlogPage />} />
                <Route
                  path="blog/category/:category"
                  element={<BlogCategoryPage />}
                />
                <Route path="blog/tag/:tag" element={<BlogTagPage />} />
                <Route
                  path="blog-details/:slug"
                  element={<BlogDetailsPage />}
                />
                <Route path="project" element={<ProjectPage />} />
                <Route
                  path="project-details/:slug"
                  element={<ProjectDetailsPage />}
                />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="service-white" element={<ServicePageWhite />} />
                <Route
                  path="service-details-white/:slug"
                  element={<ServiceDetailsPageWhite />}
                />
                <Route path="blog-white" element={<BlogPageWhite />} />
                <Route
                  path="blog-white/category/:category"
                  element={<BlogCategoryPageWhite />}
                />
                <Route
                  path="blog-white/tag/:tag"
                  element={<BlogTagPageWhite />}
                />
                <Route
                  path="blog-details-white/:slug"
                  element={<BlogDetailsPageWhite />}
                />
                <Route path="project-white" element={<ProjectPageWhite />} />
                <Route
                  path="project-details-white/:slug"
                  element={<ProjectDetailsPageWhite />}
                />
                <Route path="/contact-white" element={<ContactPageWhite />} />
              </Route>
            </Routes>
          </ModalUIProvider>
        </Suspense>

        <ScrollTopBehaviour />
        <GlobaleffectProvider />
      </ErrorBoundary>
    </>
  );
}

export default App;
