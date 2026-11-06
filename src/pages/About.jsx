import React, { useState } from "react"

import FoundingStory from "../assets/Images/FoundingStory.png"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Footer from "../components/Common/Footer"
import ReviewSlider from "../components/Common/ReviewSlider"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponenet from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/HomePage/HighlightText"
import { FaCheckCircle, FaRocket, FaHandshake, FaGlobe, FaAward } from "react-icons/fa"

const milestones = [
  {
    year: "2022",
    title: "The Genesis & Core Foundation",
    description:
      "StudyNotion launched with 3 foundational web development tracks and a single-minded goal: replace passive video lectures with hands-on, production-grade project building.",
    highlight: "1,000+ Founding Students graduated within the first quarter.",
    icon: FaRocket,
  },
  {
    year: "2023",
    title: "Interactive Coding Labs & Global Mentors",
    description:
      "Introduced browser-based code sandboxes, automated test case evaluation, and weekly live architectural code reviews hosted by senior engineers.",
    highlight: "Expanded to Full-Stack MERN, Python, and Cloud Native DevOps.",
    icon: FaGlobe,
  },
  {
    year: "2024",
    title: "Enterprise Hiring Network",
    description:
      "Formed direct hiring pipelines with over 150 top technology startups and enterprises, providing alumni with guaranteed technical interviews.",
    highlight: "Over 35,000 registered learners across 40 countries.",
    icon: FaHandshake,
  },
  {
    year: "2025",
    title: "Next-Gen AI & Verified Credentials",
    description:
      "Integrated automated code feedback, adaptive interview simulators, and cryptographically verifiable digital certificates recognized worldwide.",
    highlight: "50,000+ active learners and 98% hiring partner satisfaction.",
    icon: FaAward,
  },
]

const coreValues = [
  {
    title: "Radical Ownership",
    desc: "We encourage learners to write code that solves real problems, takes full architectural responsibility, and ships to production.",
  },
  {
    title: "Zero Passive Watching",
    desc: "Every concept is backed by immediate hands-on implementation. You retain knowledge by building real, production-ready applications.",
  },
  {
    title: "Community First",
    desc: "Coding is a collaborative craft. Our peer review groups, community forums, and Discord channels ensure nobody learns alone.",
  },
  {
    title: "Transparent Outcomes",
    desc: "From realistic compensation data to verifiable certificates, we maintain high standards and never make false promises.",
  },
]

const About = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(3) // 2025 default

  const activeMilestone = milestones[selectedMilestone]
  const MilestoneIcon = activeMilestone.icon

  return (
    <div>
      <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              StudyNotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img
              src={BannerImage1}
              alt="StudyNotion Campus Life"
              className="rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-richblack-700/60 object-cover hover:scale-105 transition-all duration-300 h-[140px] sm:h-[180px] md:h-[230px] lg:h-[280px] w-full"
            />
            <img
              src={BannerImage2}
              alt="Interactive Learning"
              className="rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-richblack-700/60 object-cover hover:scale-105 transition-all duration-300 h-[140px] sm:h-[180px] md:h-[230px] lg:h-[280px] w-full"
            />
            <img
              src={BannerImage3}
              alt="Collaborative Projects"
              className="rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-richblack-700/60 object-cover hover:scale-105 transition-all duration-300 h-[140px] sm:h-[180px] md:h-[230px] lg:h-[280px] w-full"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            <div className="lg:w-[45%]">
              <img
                src={FoundingStory}
                alt="Our Founding Story"
                className="rounded-2xl shadow-[0_0_35px_0] shadow-[#FC6767]/30 border border-richblack-700/70 hover:scale-[1.02] transition-all duration-300 object-cover w-full"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines cutting-edge
                technology with engaging content, fostering a dynamic and
                interactive learning experience.
              </p>
            </div>
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our mission goes beyond just delivering courses online. We wanted
                to create a vibrant community of learners, where individuals can
                connect, collaborate, and learn from one another. We believe
                that knowledge thrives in an environment of sharing and
                dialogue, and we foster this spirit of collaboration through
                forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Interactive Milestones Section */}
      <section className="border-t border-b border-richblack-700 bg-richblack-800/60 py-20">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <div className="text-center">
            <span className="rounded-full border border-yellow-50/20 bg-yellow-50/10 px-4 py-1 text-xs font-semibold text-yellow-50">
              Our Journey
            </span>
            <h2 className="mt-3 text-3xl font-bold text-richblack-5">
              StudyNotion Milestones & Growth
            </h2>
            <p className="mt-2 text-sm text-richblack-300">
              Click a year to view key breakthroughs that shaped our platform.
            </p>
          </div>

          {/* Interactive Year Selector Tabs */}
          <div className="mt-8 flex justify-center gap-3">
            {milestones.map((m, idx) => (
              <button
                key={m.year}
                onClick={() => setSelectedMilestone(idx)}
                className={`rounded-xl px-6 py-2.5 text-sm font-bold transition-all ${
                  selectedMilestone === idx
                    ? "bg-yellow-50 text-richblack-900 shadow-xl scale-105"
                    : "bg-richblack-700 text-richblack-300 hover:bg-richblack-600 hover:text-white"
                }`}
              >
                {m.year}
              </button>
            ))}
          </div>

          {/* Dynamic Milestone Card */}
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-richblack-700 bg-richblack-900/90 p-8 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50/10 text-yellow-50 text-2xl border border-yellow-50/20">
                <MilestoneIcon />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-yellow-50">
                  Year {activeMilestone.year}
                </span>
                <h3 className="text-2xl font-bold text-richblack-5 mt-0.5">
                  {activeMilestone.title}
                </h3>
              </div>
            </div>
            <p className="mt-4 text-base leading-relaxed text-richblack-200">
              {activeMilestone.description}
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-yellow-50/20 bg-yellow-50/5 p-4 text-sm font-semibold text-yellow-50">
              <FaCheckCircle className="text-base shrink-0" />
              <span>{activeMilestone.highlight}</span>
            </div>
          </div>

          {/* Core Values 4-Grid */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-richblack-700/80 bg-richblack-800/40 p-6 backdrop-blur-md transition-all hover:border-yellow-50/40 hover:-translate-y-1 shadow-lg"
              >
                <h4 className="text-lg font-semibold text-richblack-5">
                  {val.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-richblack-300 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsComponenet />
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  )
}

export default About
