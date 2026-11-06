import React, { useState } from "react"
// Icons Import
import {
  FaArrowRight,
  FaGraduationCap,
  FaBook,
  FaStar,
  FaBriefcase,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa"
import { Link } from "react-router-dom"

// Image and Video Import
import Banner from "../assets/Images/banner.mp4"
// Component Imports
import Footer from "../components/Common/Footer"
import ReviewSlider from "../components/Common/ReviewSlider"
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import HighlightText from "../components/core/HomePage/HighlightText"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import TimelineSection from "../components/core/HomePage/Timeline"

const careerGoalTracks = [
  {
    id: "web",
    name: "Full-Stack Web Architect",
    role: "Senior MERN / Next.js Engineer",
    salary: "$85,000 - $130,000 / yr",
    duration: "6 Months",
    level: "Beginner to Advanced",
    skills: ["React 18", "Node.js", "Express", "MongoDB", "Redux Toolkit", "REST APIs", "Tailwind CSS"],
    description:
      "Master modern frontend and scalable backend architecture. Build production-ready SaaS projects, state management with Redux, and JWT secure auth.",
    catalogLink: "/catalog/web-development",
  },
  {
    id: "ai",
    name: "AI & Data Science Specialist",
    role: "Machine Learning / Data Engineer",
    salary: "$95,000 - $145,000 / yr",
    duration: "5 Months",
    level: "Intermediate",
    skills: ["Python 3", "Pandas", "NumPy", "Scikit-Learn", "PyTorch", "Data Pipelines", "GenAI"],
    description:
      "Harness the power of Python, statistical data modeling, and neural networks. Train custom LLM models and deploy production AI microservices.",
    catalogLink: "/catalog/python",
  },
  {
    id: "cloud",
    name: "Cloud & DevOps Architect",
    role: "Site Reliability & Cloud Engineer",
    salary: "$90,000 - $140,000 / yr",
    duration: "4 Months",
    level: "Intermediate to Pro",
    skills: ["Docker", "Kubernetes", "AWS Cloud", "CI/CD Pipelines", "Terraform", "Monitoring"],
    description:
      "Automate enterprise deployments with containerization, cloud-native infrastructure, and zero-downtime rolling updates on AWS.",
    catalogLink: "/catalog/devops",
  },
  {
    id: "mobile",
    name: "Native & Cross-Platform Mobile",
    role: "Mobile App Architect",
    salary: "$80,000 - $125,000 / yr",
    duration: "4 Months",
    level: "Beginner to Intermediate",
    skills: ["Kotlin", "Jetpack Compose", "React Native", "Firebase", "App Store Deployment"],
    description:
      "Design and deploy silky-smooth mobile applications across Android and iOS with native performance, offline persistence, and cloud sync.",
    catalogLink: "/catalog/android-development",
  },
]

const homeFaqs = [
  {
    q: "Do I get lifetime access to purchased courses?",
    a: "Yes! Once you enroll in any course on StudyNotion, you have lifetime unlimited access to all lectures, coding exercises, quizzes, and future curriculum updates.",
  },
  {
    q: "Are the course completion certificates recognized by employers?",
    a: "Absolutely. Each certificate includes a cryptographically verifiable ID that proves you completed hands-on capstone projects and evaluated assessments.",
  },
  {
    q: "What if I get stuck while writing code or doing exercises?",
    a: "Every course features a dedicated Q&A forum with instructor answers, code review feedback from mentors, and our active student community on Discord.",
  },
  {
    q: "Can I switch learning tracks or get a refund if not satisfied?",
    a: "We offer a 30-day money-back guarantee on all courses. If a track isn't the right fit, you can switch tracks or request a full refund with one click.",
  },
]

function Home() {
  const [selectedGoal, setSelectedGoal] = useState("web")
  const [openFaq, setOpenFaq] = useState(0)

  const activeTrack =
    careerGoalTracks.find((t) => t.id === selectedGoal) || careerGoalTracks[0]

  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* Become an Instructor Button */}
        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center text-4xl font-semibold">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        {/* Sub Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-row gap-7">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/* Video Banner */}
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)] rounded-2xl"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Dynamic Live Floating Stats Bar */}
        <div className="my-6 grid w-full grid-cols-2 gap-4 rounded-2xl border border-richblack-700/80 bg-richblack-800/80 p-6 backdrop-blur-xl md:grid-cols-4 shadow-2xl">
          <div className="flex items-center gap-3 border-r-0 md:border-r border-richblack-700/60 pr-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50/10 text-yellow-50 text-xl border border-yellow-50/20">
              <FaGraduationCap />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-richblack-5">50,000+</p>
              <p className="text-xs text-richblack-300 font-medium">Active Learners</p>
            </div>
          </div>
          <div className="flex items-center gap-3 border-r-0 md:border-r border-richblack-700/60 pr-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100/10 text-blue-100 text-xl border border-blue-100/20">
              <FaBook />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-richblack-5">250+</p>
              <p className="text-xs text-richblack-300 font-medium">Hands-on Courses</p>
            </div>
          </div>
          <div className="flex items-center gap-3 border-r-0 md:border-r border-richblack-700/60 pr-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-caribbeangreen-100/10 text-caribbeangreen-100 text-xl border border-caribbeangreen-100/20">
              <FaBriefcase />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-richblack-5">98%</p>
              <p className="text-xs text-richblack-300 font-medium">Placement Rate</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100/10 text-yellow-100 text-xl border border-yellow-100/20">
              <FaStar />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-richblack-5">4.9 / 5.0</p>
              <p className="text-xs text-richblack-300 font-medium">20,000+ Reviews</p>
            </div>
          </div>
        </div>

        {/* Code Section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            filename="index.html"
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>StudyNotion</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/catalog">Catalog</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            filename="App.jsx"
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport { FaRocket } from "react-icons/fa";\n\nconst App = () => {\n  return (\n    <div className="hero">\n      <h1>Learn Fast & Build Big</h1>\n    </div>\n  );\n};\nexport default App;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* Dynamic Career Goal Path Explorer */}
        <div className="my-14 w-full rounded-3xl border border-richblack-700/80 bg-richblack-800/60 p-6 sm:p-10 backdrop-blur-xl">
          <div className="text-center">
            <span className="rounded-full border border-yellow-50/20 bg-yellow-50/10 px-4 py-1 text-xs font-semibold text-yellow-50">
              Interactive Career Matcher
            </span>
            <h2 className="mt-3 text-3xl font-bold text-richblack-5">
              Choose Your High-Growth Engineering Track
            </h2>
            <p className="mt-2 text-sm text-richblack-300">
              Click a specialization to preview the curriculum timeline, key technologies, and market compensation.
            </p>
          </div>

          {/* Specialization Switcher Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {careerGoalTracks.map((track) => (
              <button
                key={track.id}
                onClick={() => setSelectedGoal(track.id)}
                className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  selectedGoal === track.id
                    ? "bg-yellow-50 text-richblack-900 shadow-lg scale-105"
                    : "bg-richblack-700/70 text-richblack-200 hover:bg-richblack-700 hover:text-white"
                }`}
              >
                {track.name}
              </button>
            ))}
          </div>

          {/* Active Track Info Card */}
          <div className="mt-8 rounded-2xl border border-richblack-700 bg-richblack-900/90 p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-richblack-700/70 pb-6">
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-yellow-50">
                  Target Outcome
                </span>
                <h3 className="text-2xl font-bold text-richblack-5 mt-1">
                  {activeTrack.role}
                </h3>
                <p className="text-xs sm:text-sm text-richblack-300 mt-2 max-w-xl">
                  {activeTrack.description}
                </p>
              </div>
              <div className="rounded-xl border border-yellow-50/20 bg-yellow-50/10 p-4 text-center min-w-[200px]">
                <span className="text-xs text-richblack-300 uppercase">Average Market Pay</span>
                <p className="text-xl font-bold text-yellow-50 mt-1">{activeTrack.salary}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-richblack-400">Core Technologies Covered:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeTrack.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-richblack-800 px-3 py-1 text-xs text-richblack-100 border border-richblack-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={activeTrack.catalogLink}
                className="inline-flex items-center gap-2 self-start sm:self-auto rounded-xl bg-yellow-50 px-6 py-2.5 text-xs sm:text-sm font-bold text-richblack-900 shadow hover:bg-yellow-25 transition-all"
              >
                Explore Track Catalog <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>

        {/* Explore Section */}
        <ExploreMore />
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          {/* Explore Full Category Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAButton active={true} linkto={"/catalog"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/about"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAButton>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become an instructor section */}
        <InstructorSection />

        {/* Interactive FAQ Section on Home */}
        <div className="my-10 w-full max-w-3xl">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-yellow-50">
              Got Questions?
            </span>
            <h2 className="text-3xl font-bold text-richblack-5 mt-2">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {homeFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800/70 p-5 transition-all hover:border-richblack-600"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="flex w-full items-center justify-between text-left text-base font-semibold text-richblack-5"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <FaChevronUp className="text-yellow-50 text-sm" />
                  ) : (
                    <FaChevronDown className="text-richblack-400 text-sm" />
                  )}
                </button>
                {openFaq === idx && (
                  <p className="mt-3 border-t border-richblack-700/60 pt-3 text-sm leading-relaxed text-richblack-300">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reviews from Other Learners */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
