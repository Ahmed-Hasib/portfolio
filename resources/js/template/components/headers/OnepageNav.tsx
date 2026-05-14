import { useEffect, useState, type MouseEvent } from "react";

interface NavItem {
  id: number;
  href: string;
  text: string;
}

interface OnepageNavProps {
  sectionIds?: NavItem[];
  activeClass?: string;
}

const navItems: NavItem[] = [
  { id: 1, href: "#home", text: "Home" },
  { id: 2, href: "#about", text: "About" },
  { id: 3, href: "#service", text: "Services" },
  { id: 4, href: "#portfolio", text: "Portfolio" },
  { id: 5, href: "#resume", text: "Resume" },
  { id: 6, href: "#pricing", text: "Pricing" },
  { id: 7, href: "#blog", text: "Blog" },
  { id: 8, href: "#contacts", text: "Contact" },
];

export default function OnepageNav({
  sectionIds = navItems,
  activeClass = "current",
}: OnepageNavProps) {
  const [activeSection, setActiveSection] = useState<string>(
    sectionIds[0].href.replace("#", "")
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px" }
    );

    const timeout = setTimeout(() => {
      sectionIds.forEach((elm) => {
        const element = document.querySelector<HTMLElement>(elm.href);
        if (element) observer.observe(element);
      });
    }, 0);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [sectionIds]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document
      .querySelector<HTMLElement>(id)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {navItems.map((item) => (
        <li
          key={item.id}
          className={
            activeSection === item.href.replace("#", "")
              ? activeClass
              : "nav-item"
          }
        >
          <a
            className="smoth-animation"
            onClick={(e) => handleClick(e, item.href)}
            href={item.href}
          >
            {item.text}
          </a>
        </li>
      ))}
    </>
  );
}
