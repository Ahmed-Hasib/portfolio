import Skills from "@/components/common/Skills";
import Copyright from "@/components/footers/Copyright";
import Footer2 from "@/components/footers/Footer2";
import Header1 from "@/components/headers/Header1";
import About from "@/components/common/About";
import Blogs from "@/components/common/Blogs2";
import Contact from "@/components/common/Contact";
import Experience from "@/components/homes/home-2/Experience";
import Experiences2 from "@/components/common/Experiences2";
import Hero from "@/components/homes/home-2/Hero";
import Portofolio from "@/components/common/Portfolio";
import Skills2 from "@/components/common/Skills3";
import Testimonials from "@/components/common/Testimonials";
import TextAnim from "@/components/common/TextAnim";

import MetaComponent from "@/components/common/Metacomponent";

const metadata = {
  title:
    "Home 02 || Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
};
export default function HomePage2White() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="tmp-white-version">
        <Header1 />
        <Hero />
        <TextAnim />
        <About />
        <Experience />
        <Skills />
        <Portofolio isLight />
        <Experiences2 />
        <Testimonials />
        <Skills2 />
        <Contact />
        <Blogs isLight />
        <Footer2 />
        <Copyright />
      </div>
    </>
  );
}
