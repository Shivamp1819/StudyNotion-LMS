import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highliteText: "Anyone, Anywhere",
    description:
      "Studynotion partners with leading tech leaders and global companies to bring flexible, affordable, and job-relevant online education to passionate learners worldwide.",
    BtnText: "Explore Courses",
    BtnLink: "/catalog",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and master in-demand tech stacks! Our curriculum is continuously updated alongside top engineers to match modern tech company hiring standards.",
  },
  {
    order: 2,
    heading: "Interactive Learning Methods",
    description:
      "Learn by building production-grade software from day one with hands-on labs, guided walkthroughs, and architectural case studies.",
  },
  {
    order: 3,
    heading: "Industry-Recognized Certification",
    description:
      "Earn verifiable credentials and portfolio capstones upon graduation that showcase your proven competencies to recruiters globally.",
  },
  {
    order: 4,
    heading: "Automated Code Grading",
    description:
      "Receive instantaneous intelligent feedback, comprehensive test suite evaluations, and optimization tips on all your code submissions.",
  },
  {
    order: 5,
    heading: "Ready for the Global Job Market",
    description:
      "Graduate with complete resume-ready projects, behavioral & technical interview prep, and direct exposure to top hiring networks.",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-full max-w-maxContent grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${
              card.order === -1
                ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-richblack-800 to-richblack-900 border border-richblack-700/80 p-8 rounded-2xl shadow-xl flex flex-col justify-between"
                : "flex flex-col justify-between p-8 rounded-2xl bg-richblack-800/90 border border-richblack-700/80 shadow-lg hover:border-yellow-50/40 hover:scale-[1.02] transition-all duration-300"
            }`}
          >
            {card.order < 0 ? (
              <div className="flex flex-col gap-4">
                <div className="text-3xl lg:text-4xl font-semibold leading-tight">
                  {card.heading}{" "}
                  <HighlightText text={card.highliteText} />
                </div>
                <p className="text-richblack-300 font-medium text-base leading-relaxed">
                  {card.description}
                </p>

                <div className="w-fit mt-4">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <h1 className="text-richblack-5 font-semibold text-xl leading-snug">
                  {card.heading}
                </h1>
                <p className="text-richblack-300 font-normal text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
