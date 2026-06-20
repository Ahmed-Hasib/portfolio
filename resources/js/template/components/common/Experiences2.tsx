function formatExperienceDates(experience) {
  const startYear = experience.start_date?.slice(0, 4);
  const endYear = experience.is_current
    ? "Present"
    : experience.end_date?.slice(0, 4);

  return [startYear, endYear].filter(Boolean).join(" - ");
}

function buildExperienceDescription(experience) {
  if (experience.summary) {
    return experience.summary;
  }

  if (experience.job_descriptions?.length > 0) {
    return experience.job_descriptions[0].description;
  }

  if (experience.achievements?.length > 0) {
    return experience.achievements[0];
  }

  return "Professional experience managed from the admin panel.";
}

export default function Experiences2({ experiences = [] }) {
  return (
    <section className="my-expertise-area tpm-custom-box-bg">
      <div className="container">
        <div className="header-top-inner">
          <div className="section-head text-align-left">
            <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
              <span className="subtitle">My Expertise</span>
            </div>
            <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
              Elevated Designs Personalized <br />
              the best Experiences
            </h2>
          </div>
          <div className="discription-area tmp-scroll-trigger tmp-fade-in animation-order-3">
            <p className="description color-primary-3rd">
              Business consulting consultants provide expert advice and guida
              businesses to help them improve their performance, efficiency, and
              organizational
            </p>
          </div>
        </div>
        <div className="services-widget v2">
          {experiences.map((experience, index) => {
            const percentage = Math.max(70, 95 - index * 5);
            const dates = formatExperienceDates(experience);

            return (
            <div
              className={`service-item tmp-scroll-trigger tmp-fade-in ${
                index == 0 ? "current" : ""
              } animation-order-${(index % 4) + 1}`}
              key={index}
            >
              <div className="my-expertise-card-wrap">
                <div className="expertise-card-left">
                  <div className="expertise-card-logo">
                    <img
                      loading="lazy"
                      alt="logo"
                      src="/assets/images/my-expertise/logo-4.svg"
                      width={45}
                      height={45}
                    />
                  </div>
                  <h3 className="title">{experience.role}</h3>
                </div>
                <div
                  className="single-progress-circle sal-animate"
                  data-sal-delay={300}
                  data-sal="slide-up"
                  data-sal-duration={1000}
                >
                  <svg
                    className="radial-progress"
                    data-countervalue={percentage}
                    viewBox="0 0 80 80"
                  >
                    <circle className="bar-static" cx={40} cy={40} r={35} />
                    <circle
                      className="bar--animated"
                      cx={40}
                      cy={40}
                      r={35}
                      style={{ strokeDashoffset: "131.947px" }} // This could be dynamic if needed
                    />
                    <text
                      className="countervalue"
                      x="50%"
                      y="55%"
                      transform="matrix(0, 1, -1, 0, 80, 0)"
                    >
                      {percentage}%
                    </text>
                  </svg>
                </div>
                <p className="para">
                  <strong>{experience.company_name}</strong>
                  {dates ? ` | ${dates}` : ""}
                  <br />
                  {buildExperienceDescription(experience)}
                </p>
              </div>
              <button className="service-link modal-popup" />
            </div>
            );
          })}
          <div className="active-bg wow fadeInUp mleave" />
        </div>
      </div>
    </section>
  );
}
