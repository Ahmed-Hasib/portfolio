import { useEffect } from "react";
import WOW from "wow.js";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
import { SplitText } from "gsap/SplitText";
// import WOW from "@/utlis/wow";
export default function GlobaleffectProvider() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);

  useEffect(() => {
    const RBT_SCROLL_ACTIVATION = "tmp-scroll-trigger";
    const RBT_SCROLL_OFFSCREEN_ACTIVATION = "tmp-scroll-trigger--offscreen";
    const RBT_SCROLL_ZOOM_IN_ACTIVATION = "animate--zoom-in";
    const RBT_SCROLL_CANCEL_ACTIVATION = "tmp-scroll-trigger--cancel";

    const scrollObservers: IntersectionObserver[] = [];
    const zoomScrollHandlers: (() => void)[] = [];

    // Intersection handler for scroll-triggered elements
    function onIntersection(
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) {
      entries.forEach((entry, index) => {
        const target = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          if (target.classList.contains(RBT_SCROLL_OFFSCREEN_ACTIVATION)) {
            target.classList.remove(RBT_SCROLL_OFFSCREEN_ACTIVATION);
            if (target.dataset.cascade) {
              target.style.setProperty("--animation-order", index.toString());
            }
          }
          observer.unobserve(target);
        } else {
          target.classList.add(RBT_SCROLL_OFFSCREEN_ACTIVATION);
          target.classList.remove(RBT_SCROLL_CANCEL_ACTIVATION);
        }
      });
    }

    function initializeScrollAnimationTrigger(
      rootEl: Document | HTMLElement = document,
      isDesignModeEvent: boolean = false
    ) {
      const elements = rootEl.querySelectorAll<HTMLElement>(
        `.${RBT_SCROLL_ACTIVATION}`
      );
      if (elements.length === 0) return;

      if (isDesignModeEvent) {
        elements.forEach((el) =>
          el.classList.add("tmp-scroll-trigger--design-mode")
        );
        return;
      }

      const observer = new IntersectionObserver(onIntersection, {
        rootMargin: "0px 0px -50px 0px",
      });

      elements.forEach((el) => observer.observe(el));
      scrollObservers.push(observer);
    }

    function percentageSeen(element: Element): number {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const rect = element.getBoundingClientRect();
      const elementY = rect.top + scrollY;
      const elementHeight = rect.height;

      if (elementY > scrollY + viewportHeight) return 0;
      if (elementY + elementHeight < scrollY) return 100;

      return Math.round(
        (scrollY + viewportHeight - elementY) /
          ((viewportHeight + elementHeight) / 100)
      );
    }

    function throttle<T extends (...args: never[]) => void>(
      fn: T,
      wait: number
    ): (...args: Parameters<T>) => void {
      let last = Date.now();
      return (...args: Parameters<T>) => {
        if (last + wait - Date.now() < 0) {
          fn(...args); // 'this' is no longer needed here
          last = Date.now();
        }
      };
    }

    function initializeScrollZoomAnimationTrigger() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const elements = document.querySelectorAll<HTMLElement>(
        `.${RBT_SCROLL_ZOOM_IN_ACTIVATION}`
      );
      const scaleAmount = 0.2 / 100;

      elements.forEach((element) => {
        let isVisible = false;

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
          });
        });

        observer.observe(element);
        scrollObservers.push(observer);

        element.style.setProperty(
          "--zoom-in-ratio",
          (1 + scaleAmount * percentageSeen(element)).toString()
        );

        const handleScroll = throttle(() => {
          if (isVisible) {
            element.style.setProperty(
              "--zoom-in-ratio",
              (1 + scaleAmount * percentageSeen(element)).toString()
            );
          }
        }, 100);

        window.addEventListener("scroll", handleScroll, { passive: true });
        zoomScrollHandlers.push(() =>
          window.removeEventListener("scroll", handleScroll)
        );
      });
    }

    // Init animations and remove initial hidden swiper state
    document
      .querySelectorAll<HTMLElement>(".swiper-slide.opacity-0")
      .forEach((el) => el.classList.remove("opacity-0"));

    initializeScrollAnimationTrigger();
    initializeScrollZoomAnimationTrigger();

    return () => {
      scrollObservers.forEach((observer) => observer.disconnect());
      zoomScrollHandlers.forEach((removeFn) => removeFn());
    };
  }, [pathname]);

  useEffect(() => {
    const servicesWidget =
      document.querySelector<HTMLElement>(".services-widget");

    if (!servicesWidget) return; // ✅ early return ensures it's not null after this

    const activeBg = servicesWidget.querySelector<HTMLElement>(".active-bg");

    function updateActiveService(element: Element | null): void {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const widgetRect = servicesWidget!.getBoundingClientRect();
      const topOff = rect.top - widgetRect.top;
      const height = (element as HTMLElement).offsetHeight;

      const closestServiceItem = element.closest(
        ".service-item"
      ) as HTMLElement | null;

      if (closestServiceItem) {
        closestServiceItem.classList.remove("mleave");
      }

      servicesWidget!
        .querySelectorAll<HTMLElement>(".service-item")
        .forEach((item) => {
          if (closestServiceItem !== item) {
            item.classList.add("mleave");
          }
        });

      if (activeBg) {
        activeBg.style.top = `${topOff}px`;
        activeBg.style.height = `${height}px`;
      }
    }

    function handleMouseEnter(e: Event): void {
      const target = e.target as HTMLElement;
      const serviceItem = target.closest(".service-item") as HTMLElement | null;
      if (serviceItem) {
        updateActiveService(serviceItem);
      }
    }

    function handleMouseLeave(): void {
      const currentElement = servicesWidget!.querySelector(".current");

      updateActiveService(currentElement);

      servicesWidget!
        .querySelectorAll<HTMLElement>(".service-item")
        .forEach((item) => {
          if (!currentElement || !item.contains(currentElement)) {
            item.classList.remove("mleave");
          }
        });
    }

    function handleClick(e: Event): void {
      const target = e.target as HTMLElement;
      const serviceItem = target.closest(".service-item") as HTMLElement | null;
      if (serviceItem) {
        servicesWidget!
          .querySelectorAll<HTMLElement>(".service-item")
          .forEach((item) => {
            item.classList.remove("current");
          });
        serviceItem.classList.add("current");
      }
    }

    servicesWidget!.addEventListener("mouseenter", handleMouseEnter, true);
    servicesWidget!.addEventListener("mouseleave", handleMouseLeave);
    servicesWidget!.addEventListener("click", handleClick);

    // Initial state setup
    updateActiveService(servicesWidget!.querySelector(".current"));

    return () => {
      servicesWidget!.removeEventListener("mouseenter", handleMouseEnter, true);
      servicesWidget!.removeEventListener("mouseleave", handleMouseLeave);
      servicesWidget!.removeEventListener("click", handleClick);
    };
  }, [pathname]);
  useEffect(() => {
    const cards = document.querySelectorAll(".tmponhover");

    const handleCardMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const tmpOnHover = e.currentTarget as HTMLElement;
      const x = mouseEvent.pageX - tmpOnHover.offsetLeft;
      const y = mouseEvent.pageY - tmpOnHover.offsetTop;

      tmpOnHover.style.setProperty("--x", `${x}px`);
      tmpOnHover.style.setProperty("--y", `${y}px`);
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", handleCardMouseMove as EventListener);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener(
          "mousemove",
          handleCardMouseMove as EventListener
        );
      });
    };
  }, [pathname]);

  useEffect(() => {
    const animates = document.querySelectorAll<HTMLElement>(
      ".tmp-scroll-trigger"
    );
    if (animates.length === 0) return;

    const handleAnimationEnd = (e: AnimationEvent) => {
      const target = e.target as HTMLElement;
      if (target) {
        setTimeout(() => {
          target.setAttribute("animation-end", "");
        }, 1000);
      }
    };

    animates.forEach((el) => {
      el.addEventListener("animationend", handleAnimationEnd);
    });

    return () => {
      animates.forEach((el) => {
        el.removeEventListener("animationend", handleAnimationEnd);
      });
    };
  }, [pathname]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".tmp-title-split");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement & {
            split?: SplitText;
            animation?: gsap.core.Animation;
          };

          // Cleanup previous animation/split
          if (el.animation) {
            el.animation.progress(1).kill();
          }
          if (el.split) {
            el.split.revert();
          }

          el.split = new SplitText(el, { type: "chars" });

          gsap.set(el, { perspective: 400 });
          gsap.set(el.split.chars, {
            opacity: 0,
            x: "-10",
            rotateX: "0",
          });

          el.animation = gsap.to(el.split.chars, {
            x: "0",
            y: "0",
            rotateX: "0",
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: 0.02,
          });

          observer.unobserve(el); // avoid re-trigger
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      elements.forEach((el) => {
        const e = el as HTMLElement & {
          split?: SplitText;
          animation?: gsap.core.Animation;
        };
        e.animation?.kill();
        e.split?.revert();
        delete e.animation;
        delete e.split;
      });
    };
  }, [pathname]);
  useEffect(() => {
    const wow = new WOW({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);
  return <></>;
}
