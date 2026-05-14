import Blogs3 from "@/components/common/Blogs3";
import Brands from "@/components/common/Brands";

import Education from "@/components/common/Education2";
import Portfolio from "@/components/common/Portfolio2";
import Pricing from "@/components/common/Pricing";
import Header3 from "@/components/headers/Header3";
import Contact from "@/components/common/Contact2";
import Hero from "@/components/homes/home-12/Hero";
import Services from "@/components/common/Services6";

import Footer1 from "@/components/footers/Footer1";
import Copyright from "@/components/footers/Copyright";
import Header5 from "@/components/headers/Header5";

import MetaComponent from "@/components/common/Metacomponent";

const metadata = {
  title:
    "Home 12 || Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
};
export default function HomePage12() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header3 />
      <Header5 />
      <div className="page-with-left-header">
        <Hero />
        <Services parentClass="latest-service-area pt--40" />
        <Portfolio />
        <Education />
        <Brands />
        <Pricing />
        <Blogs3 parentClass="blog-and-news-are tmp-section-gapTop" />
        <Contact parentClass="get-in-touch-area tmp-section-gap" />
        <Footer1 />
        <Copyright />
      </div>
    </>
  );
}
