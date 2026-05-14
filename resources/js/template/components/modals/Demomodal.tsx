import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { demoData, whiteDemoData } from "@/data/menu";
import { useModalUI } from "@/context/ModalUIContext";

interface DemoItem {
  href: string;
  img: string;
  title: string;
}

export default function Demomodal() {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { openModals, closeModal } = useModalUI();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal("demoModal");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className={`demo-modal-area ${openModals.demoModal ? "open" : ""} `}>
      <div className="wrapper">
        <div className="tmp-modal-inner" ref={modalRef}>
          <div className="close-icon">
            <button
              className="demo-close-btn"
              onClick={() => closeModal("demoModal")}
            >
              <span>
                <i className="fa-sharp fa-light fa-xmark" />
              </span>
            </button>
          </div>
          <div className="demo-top text-center">
            <h4 className="title">Reeni</h4>
            <p className="subtitle">
              A personal portfolio website is your digital resume—a place to
              showcase your work, skills, and achievements.
            </p>
          </div>
          <ul
            className="popuptab-area nav nav-tabs"
            id="popuptab"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active demo-dark"
                id="demodark-tab"
                data-bs-toggle="tab"
                href="#demodark"
                role="tab"
                aria-controls="demodark"
                aria-selected="true"
                onClick={() => {
                  document
                    .querySelector(".demo-modal-area")
                    ?.classList.remove("active-light");
                }}
              >
                Dark Demo
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link demo-light"
                id="demolight-tab"
                data-bs-toggle="tab"
                href="#demolight"
                role="tab"
                aria-controls="demolight"
                aria-selected="false"
                onClick={() => {
                  document
                    .querySelector(".demo-modal-area")
                    ?.classList.add("active-light");
                }}
              >
                Light Demo
              </a>
            </li>
          </ul>
          <div className="tab-content" id="popuptabContent">
            <div
              className="tab-pane show active"
              id="demodark"
              role="tabpanel"
              aria-labelledby="demodark-tab"
            >
              <div className="content">
                <div className="row">
                  {(demoData as DemoItem[]).map((demo, index) => (
                    <div className="col-lg-4 col-md-6 col-12" key={index}>
                      <div className="single-demo">
                        <div className="inner">
                          <div className="thumbnail">
                            <Link to={demo.href}>
                              <img
                                loading="lazy"
                                className="w-100"
                                alt="Personal Portfolio"
                                src={demo.img}
                                width={340}
                                height={240}
                              />
                              <span className="overlay-content">
                                <span className="overlay-text">
                                  View Demo{" "}
                                  <i className="feather-external-link" />
                                </span>
                              </span>
                            </Link>
                          </div>
                          <div className="inner">
                            <h3 className="title">
                              <Link to={demo.href}>{demo.title}</Link>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-demo">
                      <div className="inner">
                        <div className="thumbnail">
                          <a href="#">
                            <img
                              loading="lazy"
                              className="w-100"
                              alt="Coming Soon"
                              src="/assets/images/demo/coming-soon.png"
                              width={340}
                              height={240}
                            />
                            <span className="overlay-content">
                              <span className="overlay-text">
                                View Demo{" "}
                                <i className="feather-external-link" />
                              </span>
                            </span>
                          </a>
                        </div>
                        <div className="inner">
                          <h3 className="title">
                            <a href="#">Demo 23</a>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane"
              id="demolight"
              role="tabpanel"
              aria-labelledby="demolight-tab"
            >
              <div className="content">
                <div className="row">
                  {(whiteDemoData as DemoItem[]).map((demo, index) => (
                    <div className="col-lg-4 col-md-6 col-12" key={index}>
                      <div className="single-demo">
                        <div className="inner">
                          <div className="thumbnail">
                            <Link to={demo.href}>
                              <img
                                loading="lazy"
                                className="w-100"
                                alt="Personal Portfolio"
                                src={demo.img}
                                width={340}
                                height={240}
                              />
                              <span className="overlay-content">
                                <span className="overlay-text">
                                  View Demo{" "}
                                  <i className="feather-external-link" />
                                </span>
                              </span>
                            </Link>
                          </div>
                          <div className="inner">
                            <h3 className="title">
                              <Link to={demo.href}>{demo.title}</Link>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="single-demo">
                      <div className="inner">
                        <div className="thumbnail">
                          <a href="#">
                            <img
                              loading="lazy"
                              className="w-100"
                              alt="Coming Soon"
                              src="/assets/images/demo/coming-soon-white.png"
                              width={340}
                              height={240}
                            />
                            <span className="overlay-content">
                              <span className="overlay-text">
                                View Demo{" "}
                                <i className="feather-external-link" />
                              </span>
                            </span>
                          </a>
                        </div>
                        <div className="inner">
                          <h3 className="title">
                            <a href="#">Demo 23</a>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
