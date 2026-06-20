import About from "@/components/common/About";
import Contact from "@/components/common/Contact";
import Experiences2 from "@/components/common/Experiences2";
import Skills3 from "@/components/common/Skills3";
import Testimonials from "@/components/common/Testimonials";
import Copyright from "@/components/footers/Copyright";
import Footer2 from "@/components/footers/Footer2";
import Header1 from "@/components/headers/Header1";
import Blogs from "@/components/homes/home-4/Blogs";
import Hero from "@/components/homes/home-6/Hero";
import Portfolio from "@/components/homes/home-4/Portfolio";
import Portfolios2 from "@/components/homes/home-4/Portfolios2";
import Pricing from "@/components/homes/home-4/Pricing";

import MetaComponent from "@/components/common/Metacomponent";
import usePortfolioContent from "../../../../hooks/usePortfolioContent";

const metadata = {
  title:
    "Home 06 || Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio Reactjs Template | Freelancer & Developer Portfolio",
};
export default function HomePage6() {
  const { profile, skills, experiences, projects } = usePortfolioContent();

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="color-primary-3rd">
        <Header1 />
        <Hero profile={profile} />
        <About />
        <Portfolio projects={projects} />
        <Experiences2 experiences={experiences} />
        <Testimonials />
        <Skills3 skills={skills} />
        <Portfolios2 projects={projects} />
        <Pricing />
        <Contact />
        <Blogs />
        <Footer2 />
        <Copyright />
      </div>
    </>
  );
}
