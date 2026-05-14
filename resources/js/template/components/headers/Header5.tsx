import { useModalUI } from "@/context/ModalUIContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header5() {
  const { openModal } = useModalUI();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsSticky(window.scrollY > 150);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`tmp-responsive-header-style d-block d-xl-none header-onepage-mobile header--sticky  ${
        isSticky ? "sticky" : ""
      } `}
    >
      <div className="row align-items-center">
        <div className="col-6">
          <div className="logo">
            <Link to={`/`}>
              <img
                loading="lazy"
                alt="Reeni - Personal Portfolio HTML Template for developers and freelancers"
                width="121"
                height="41"
                src="assets/images/logo/white-logo-reeni.png"
              />
            </Link>
          </div>
        </div>
        <div className="col-6">
          <div className="header-right text-end">
            <div className="tmp-side-collups-area d-flex justify-content-end">
              <button
                className="tmp-menu-bars humberger_menu_active"
                onClick={() => openModal("mobileMenu2")}
              >
                <i className="fa-regular fa-bars-staggered"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
