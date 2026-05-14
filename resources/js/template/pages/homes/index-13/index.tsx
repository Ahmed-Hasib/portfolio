import Footer5 from "@/components/footers/Footer5";
import Header4 from "@/components/headers/Header4";
import About from "@/components/homes/home-13/About";
import Contact from "@/components/homes/home-13/Contact";
import Facts from "@/components/homes/home-13/Facts";
import Hero from "@/components/homes/home-13/Hero";
import Portfolio from "@/components/homes/home-13/Portfolio";
import Pricing from "@/components/homes/home-13/Pricing";
import Profile from "@/components/homes/home-13/Profile";
import Resume from "@/components/homes/home-13/Resume";
import Services from "@/components/homes/home-13/Services";
import Skills from "@/components/homes/home-13/Skills";

import MetaComponent from "@/components/common/Metacomponent";

const metadata = {
  title:
    "Home 13 || Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
};
export default function HomePage13() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="personal-demo-left-fixed">
        <Header4 />
        <div className="personal-page-inner-wrapper">
          <div className="container-fluid-13">
            <div className="row">
              <div className="col-xl-4">
                <Profile />
              </div>
              <div className="col-xl-8 pl--70 pl_md--15 pl_sm--15 pt--70">
                <div className="personal-portfolio-right-inner-wrapper">
                  <Hero />
                  <Facts />
                  <About />
                  <Resume />
                  {/* Start Service__Style--1 Area  */}
                  <Services />
                  {/* End Service__Style--1 Area  */}
                  {/* Start Service__Style--1 Area  */}
                  <Skills />
                  {/* End Service__Style--1 Area  */}
                  {/* tmp portfolio area start */}
                  <Portfolio />
                  {/* tmp portfolio area end */}
                  {/* Start Pricing--1 Area  */}
                  <Pricing />
                  {/* End Pricing--1 Area  */}
                  {/* tmp contact area start */}
                  <Contact />
                  {/* tmp contact area end */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer5 />
      </div>
    </>
  );
}
