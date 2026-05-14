"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function TextAnim() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement & {
            split?: SplitText;
            animation?: gsap.core.Animation;
          };

          // Kill and revert if already animated
          element.animation?.progress(1).kill();
          element.split?.revert();

          element.split = new SplitText(element, {
            type: "lines,words,chars",
            linesClass: "split-line",
          });

          gsap.set(element, { perspective: 400 });
          gsap.set(element.split.chars, {
            opacity: 0,
            x: -10,
            rotateX: 0,
          });

          element.animation = gsap.to(element.split.chars, {
            x: 0,
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: 0.02,
          });

          observer.unobserve(element);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      const element = el as HTMLHeadingElement & {
        split?: SplitText;
        animation?: gsap.core.Animation;
      };
      if (element.split) element.split.revert();
      element.animation?.kill();
      delete element.split;
      delete element.animation;
    };
  }, []);

  return (
    <div className="about-content-area">
      <div className="container tmp-section-gap">
        <div className="text-para-doc-wrap">
          <h2
            ref={textRef}
            className="text-para-documents tmp-scroll-trigger tmp-fade-in inv-title-animation-wrap animation-order-1"
          >
            A personal <span>portfolio</span> is a collection of your work, that
            is aa go achievements, and skills that highlights{" "}
            <span>web design</span> in your is abilities and professional
            growth. It serves as A personal to a portfolio in
            <span> since 2009</span> a collection of your work
          </h2>

          <div className="right-bg-text-para">
            <img
              loading="lazy"
              alt="Right background"
              src="/assets/images/banner/right-bg-text-para-doc.png"
              width={614}
              height={268}
            />
          </div>
          <div className="left-bg-text-para">
            <img
              loading="lazy"
              alt="Left background"
              src="/assets/images/banner/left-bg-text-para-doc.png"
              width={614}
              height={268}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
