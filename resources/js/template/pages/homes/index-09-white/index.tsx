import Services3 from "@/components/common/Services3";
import Header2 from "@/components/headers/Header2";
import Education from "@/components/common/Education2";
import About from "@/components/homes/home-9/About";
import Hero from "@/components/homes/home-9/Hero";
import Portfolio from "@/components/homes/home-9/Portfolio";

import Pricing from "@/components/common/Pricing";
import Blogs from "@/components/common/Blogs";
import Contact from "@/components/common/Contact";
import Footer1 from "@/components/footers/Footer1";

import MetaComponent from "@/components/common/Metacomponent";

const metadata = {
  title:
    "Home 09 || Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
};
export default function HomePage9White() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="tmp-white-version">
        <Header2 />
        <Hero />
        <About />
        <Services3 />
        <Portfolio isLight />
        <Education />
        <Pricing />
        <Blogs isLight />
        <Contact parentClass="get-in-touch-area tmp-section-gapBottom" />
        <Footer1 />
      </div>
    </>
  );
}
