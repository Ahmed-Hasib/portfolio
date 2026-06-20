const skillIconMap = {
  figma: "/assets/images/icons/icon-03.png",
  framer: "/assets/images/icons/icon-01.png",
  webflow: "/assets/images/icons/icon-02.png",
  wordpress: "/assets/images/icons/icon-04.png",
  react: "/assets/images/skill/react.png",
  laravel: "/assets/images/skill/laravel.png",
  linux: "/assets/images/icons/icon-01.png",
  php: "/assets/images/skill/laravel.png",
  "front end": "/assets/images/skill/react.png",
  "server management": "/assets/images/icons/icon-02.png",
};

const extraSkills = [
  {
    name: "Linux",
    category: "Server OS",
    proficiency_percentage: 90,
    icon: "linux",
  },
  {
    name: "PHP",
    category: "Backend Development",
    proficiency_percentage: 92,
    icon: "php",
  },
  {
    name: "Front End",
    category: "UI Development",
    proficiency_percentage: 88,
    icon: "front end",
  },
  {
    name: "Server Management",
    category: "Deployment & Operations",
    proficiency_percentage: 86,
    icon: "server management",
  },
];

function resolveSkillIcon(skill) {
  if (skill?.icon?.startsWith("/") || skill?.icon?.startsWith("http")) {
    return skill.icon;
  }

  const key = (skill?.icon || skill?.name || "").toLowerCase();

  return skillIconMap[key] || "/assets/images/icons/icon-01.png";
}

export default function Skills3({ skills = [] }) {
  const visibleSkills = [
    ...skills,
    ...extraSkills.filter(
      (extraSkill) =>
        !skills.some(
          (skill) =>
            skill.name?.toLowerCase() === extraSkill.name.toLowerCase()
        )
    ),
  ];

  return (
    <section
      className="my-skill-area-style-two plr--120 plr_lg--30 plr_md--30 plr_sm--30 plr_mobile--15 mt--70"
      id="resume"
    >
      <div className="tpm-custom-box-bg">
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-lg-12 col-md-12">
              <div className="my-skill-area-left-content-wrap">
                <div className="section-head text-align-left">
                  <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                    <span className="subtitle">My Skill</span>
                  </div>
                  <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                    My Experts Areas Where I <br />
                    Gained Skill
                  </h2>
                  <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
                    Business consulting consultants provide expert advice and
                    guida busi nesses to help them improve their performance,
                    efficiency, and organ izational Business consulting
                    consultants provide
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-lg-12 col-md-12">
              <div className="my-skill-card-style-two row">
                {visibleSkills.map((skill, index) => (
                  <div className="col-lg-6 col-md-6 col-12" key={index}>
                    <div
                      className={`my-skill-card tmp-scroll-trigger tmp-fade-in animation-order-${(index % 4) + 1}`}
                    >
                      <div className="card-icon">
                        <img
                          loading="lazy"
                          alt={skill.name}
                          src={resolveSkillIcon(skill)}
                          width={40}
                          height={40}
                        />
                      </div>
                      <h3 className="card-title">{skill.name}</h3>
                      <p className="card-para">
                        {skill.category || "Portfolio skill"}
                        {skill.proficiency_percentage
                          ? ` - ${skill.proficiency_percentage}% proficiency`
                          : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
