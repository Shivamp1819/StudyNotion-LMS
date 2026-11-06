import React, { useEffect, useState } from "react"
import { BiSearchAlt2 } from "react-icons/bi"
import { BsArrowRight, BsBook, BsCodeSquare, BsPhone, BsTerminal, BsCloudCheck } from "react-icons/bs"
import { FaGraduationCap, FaLayerGroup, FaRocket, FaShieldAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

import Footer from "../components/Common/Footer"
import HighlightText from "../components/core/HomePage/HighlightText"
import { apiConnector } from "../services/apiConnector"
import { categories } from "../services/apis"

// Fallback curated categories if dynamic backend list is loading
const defaultCategories = [
  {
    _id: "web-dev",
    name: "Web Development",
    description: "Master modern full-stack web development with React, Node.js, Express, MongoDB, and Next.js.",
    icon: <BsCodeSquare className="text-3xl text-yellow-50" />,
    badge: "Most Popular",
    color: "from-yellow-500/20 to-orange-500/10",
    tags: ["React", "Node.js", "Full Stack", "MERN"],
  },
  {
    _id: "python-ds",
    name: "Python",
    description: "Learn Python from the absolute fundamentals to advanced data structures, automation, and AI foundations.",
    icon: <BsTerminal className="text-3xl text-blue-100" />,
    badge: "High Demand",
    color: "from-blue-500/20 to-cyan-500/10",
    tags: ["Data Science", "OOP", "Automation", "Django"],
  },
  {
    _id: "android-dev",
    name: "Android Development",
    description: "Build robust, native and cross-platform mobile applications with Kotlin, Java, and modern Jetpack tools.",
    icon: <BsPhone className="text-3xl text-caribbeangreen-200" />,
    badge: "Trending",
    color: "from-emerald-500/20 to-teal-500/10",
    tags: ["Kotlin", "Jetpack", "Mobile Apps", "APIs"],
  },
  {
    _id: "devops-cloud",
    name: "DevOps",
    description: "Master modern containerization, CI/CD pipelines, Docker, Kubernetes, AWS, and cloud-native architecture.",
    icon: <BsCloudCheck className="text-3xl text-pink-200" />,
    badge: "Enterprise",
    color: "from-purple-500/20 to-pink-500/10",
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD"],
  },
  {
    _id: "ai-ml",
    name: "Machine Learning",
    description: "Dive deep into machine learning algorithms, deep neural networks, computer vision, and generative AI.",
    icon: <FaRocket className="text-3xl text-yellow-100" />,
    badge: "Next Gen",
    color: "from-amber-500/20 to-yellow-500/10",
    tags: ["PyTorch", "TensorFlow", "Generative AI", "NLP"],
  },
  {
    _id: "cyber-sec",
    name: "Cyber Security",
    description: "Understand ethical hacking, network defense, penetration testing, security audits, and threat detection.",
    icon: <FaShieldAlt className="text-3xl text-caribbeangreen-100" />,
    badge: "Essential",
    color: "from-green-500/20 to-emerald-500/10",
    tags: ["Ethical Hacking", "Networks", "PenTesting", "Defense"],
  },
]

const tracks = [
  {
    title: "Full-Stack Web Architect",
    duration: "6 Months",
    level: "Beginner to Advanced",
    courses: "8 Comprehensive Courses",
    description: "From HTML/CSS basics to building scalable enterprise SaaS apps with React, Node.js, and cloud deployments.",
    link: "/catalog/web-development",
  },
  {
    title: "Data Science & Machine Learning Pro",
    duration: "5 Months",
    level: "Intermediate",
    courses: "6 Applied Courses",
    description: "Learn Python data analysis, pandas, statistical modeling, machine learning algorithms, and deep neural nets.",
    link: "/catalog/python",
  },
  {
    title: "Cloud Native DevOps Engineer",
    duration: "4 Months",
    level: "Intermediate to Pro",
    courses: "5 Production Courses",
    description: "Build automated deployment pipelines with Docker, Kubernetes, AWS, infrastructure-as-code, and observability.",
    link: "/catalog/devops",
  },
]

function AllCatalog() {
  const [categoryList, setCategoryList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        if (res?.data?.data && res.data.data.length > 0) {
          // Merge dynamic categories with icons & fallbacks
          const merged = res.data.data.map((cat, idx) => {
            const fallback = defaultCategories.find(
              (df) => df.name.toLowerCase() === cat.name.toLowerCase()
            )
            return {
              ...cat,
              icon: fallback?.icon || <BsBook className="text-3xl text-yellow-50" />,
              badge: fallback?.badge || "Popular Track",
              color: fallback?.color || "from-richblack-700 to-richblack-800",
              tags: fallback?.tags || ["Industry Standards", "Hands-on", "Projects"],
              description: cat.description || fallback?.description || "Explore curated courses in this domain.",
            }
          })
          setCategoryList(merged)
        } else {
          setCategoryList(defaultCategories)
        }
      } catch (err) {
        console.error("Could not fetch categories:", err)
        setCategoryList(defaultCategories)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filteredCategories = categoryList.filter((cat) => {
    const term = searchTerm.toLowerCase()
    return (
      cat.name.toLowerCase().includes(term) ||
      cat.description.toLowerCase().includes(term)
    )
  })

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-25">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-richblack-800 to-richblack-900 border-b border-richblack-700 py-16 lg:py-24">
        <div className="absolute top-0 right-1/4 -z-0 h-[300px] w-[300px] rounded-full bg-yellow-500/10 blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/4 -z-0 h-[250px] w-[250px] rounded-full bg-blue-500/10 blur-[100px]"></div>

        <div className="relative z-10 mx-auto flex w-11/12 max-w-maxContent flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-richblack-700 bg-richblack-800/80 px-4 py-1.5 text-sm font-medium text-yellow-50 shadow-inner backdrop-blur-md">
            <FaLayerGroup className="text-yellow-50" />
            <span>Comprehensive Learning Ecosystem</span>
          </div>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
            Explore Our Course <HighlightText text="Catalog & Domains" />
          </h1>

          <p className="mt-5 max-w-2xl text-base sm:text-lg text-richblack-300">
            Discover in-depth courses designed and taught by industry experts. Gain hands-on project experience, master tech stacks, and future-proof your career.
          </p>

          {/* Search bar */}
          <div className="mt-8 flex w-full max-w-lg items-center rounded-xl border border-richblack-700 bg-richblack-800/90 px-4 py-3 shadow-xl backdrop-blur-md transition-all focus-within:border-yellow-50 focus-within:shadow-[0_0_20px_rgba(255,214,10,0.2)]">
            <BiSearchAlt2 className="text-2xl text-richblack-400" />
            <input
              type="text"
              placeholder="Search by category, skill or technology (e.g. React, Python, Cloud)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-3 w-full bg-transparent text-richblack-5 placeholder-richblack-400 outline-none text-sm sm:text-base"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-xs text-richblack-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Categories Grid */}
      <div className="mx-auto w-11/12 max-w-maxContent py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-richblack-800">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">All Learning Domains</h2>
            <p className="mt-1 text-sm text-richblack-400">
              Select a domain below to browse full course offerings, syllabi, and student ratings.
            </p>
          </div>
          <span className="rounded-full bg-richblack-800 px-3.5 py-1 text-xs font-semibold text-yellow-50 border border-richblack-700">
            {filteredCategories.length} Categories Available
          </span>
        </div>

        {loading ? (
          <div className="grid min-h-[300px] place-items-center">
            <div className="spinner"></div>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="my-16 rounded-2xl border border-richblack-800 bg-richblack-800/40 p-12 text-center">
            <p className="text-xl text-richblack-300">No categories found matching &quot;{searchTerm}&quot;</p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 rounded-lg bg-yellow-50 px-5 py-2.5 font-semibold text-richblack-900 transition-all hover:scale-95"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category) => {
              const slug = category.name.split(" ").join("-").toLowerCase()
              return (
                <Link
                  to={`/catalog/${slug}`}
                  key={category._id || category.name}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-richblack-800 bg-gradient-to-br from-richblack-800/90 to-richblack-800/40 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-yellow-50/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                >
                  <div className={`absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-br ${category.color} opacity-40 blur-xl transition-all duration-300 group-hover:opacity-75`}></div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-richblack-700 bg-richblack-900/80 shadow-md">
                        {category.icon}
                      </div>
                      <span className="rounded-full bg-richblack-700/80 px-3 py-1 text-xs font-medium text-richblack-100 border border-richblack-600/40">
                        {category.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-white transition-colors group-hover:text-yellow-50">
                      {category.name}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-richblack-300 line-clamp-3">
                      {category.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {category.tags?.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-richblack-900/60 px-2 py-0.5 text-xs text-richblack-300 border border-richblack-700/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-richblack-700/60 pt-4 text-sm font-semibold text-yellow-50">
                    <span>Explore Courses</span>
                    <BsArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Featured Career Roadmaps */}
      <div className="border-t border-richblack-800 bg-richblack-800/30 py-16">
        <div className="mx-auto w-11/12 max-w-maxContent">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-50">
              Structured Learning Paths
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Career-Ready <HighlightText text="Learning Roadmaps" />
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-richblack-300">
              Follow step-by-step curriculum roadmaps curated by tech leads to go from foundational concepts to production-level engineering.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {tracks.map((track, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-richblack-700/80 bg-richblack-800/80 p-8 shadow-xl transition-all hover:border-yellow-50/40"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-richblack-400">
                    <span className="rounded-full bg-richblack-700 px-3 py-1 text-richblack-200">
                      {track.level}
                    </span>
                    <span>{track.duration}</span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-white">{track.title}</h3>
                  <p className="mt-3 text-sm text-richblack-300 leading-relaxed">
                    {track.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs text-caribbeangreen-200 font-medium">
                    <FaGraduationCap className="text-sm" />
                    <span>{track.courses}</span>
                  </div>
                </div>

                <Link
                  to={track.link}
                  className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-yellow-50 py-3 text-sm font-bold text-richblack-900 shadow-md transition-all hover:scale-[1.02] hover:bg-yellow-100"
                >
                  Start This Path
                  <BsArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AllCatalog

