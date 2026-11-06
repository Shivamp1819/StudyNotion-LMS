import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams, useLocation, Link } from "react-router-dom"
import { BiSearchAlt2 } from "react-icons/bi"
import { FaFire, FaClock, FaStar } from "react-icons/fa"

import Footer from "../components/Common/Footer"
import CourseCard from "../components/core/Catalog/Course_Card"
import CourseSlider from "../components/core/Catalog/Course_Slider"
import { apiConnector } from "../services/apiConnector"
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponntDatas"

function Catalog() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { catalogName: paramCatalogName } = useParams()
  const location = useLocation()

  // Extract catalogName from params or route path (e.g. /python or /catalog/python)
  const rawCatalog =
    paramCatalogName ||
    location.pathname.replace(/^\/catalog\/?/, "").replace(/^\//, "").split("/")[0]
  const catalogName = rawCatalog || "all"

  const [activeTab, setActiveTab] = useState(1) // 1: Popular, 2: Newest, 3: Top Rated
  const [searchQuery, setSearchQuery] = useState("")
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const [loading, setLoading] = useState(true)
  const [categoryNotFound, setCategoryNotFound] = useState(false)

  // Fetch All Categories
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      setCategoryNotFound(false)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const categoriesList = res?.data?.data || []

        const cleanTarget = catalogName.replace(/-/g, " ").toLowerCase()

        const matchingCategory = categoriesList.find((ct) => {
          const cName = ct.name.toLowerCase()
          return (
            cName === cleanTarget ||
            ct.name.split(" ").join("-").toLowerCase() === catalogName.toLowerCase() ||
            cName.includes(cleanTarget) ||
            cleanTarget.includes(cName)
          )
        })

        if (matchingCategory?._id) {
          setCategoryId(matchingCategory._id)
        } else {
          setCategoryNotFound(true)
          setLoading(false)
        }
      } catch (error) {
        console.log("Could not fetch Categories.", error)
        setCategoryNotFound(true)
        setLoading(false)
      }
    })()
  }, [catalogName])

  useEffect(() => {
    if (categoryId) {
      ;(async () => {
        setLoading(true)
        try {
          const res = await getCatalogPageData(categoryId)
          setCatalogPageData(res)
        } catch (error) {
          console.log(error)
        }
        setLoading(false)
      })()
    }
  }, [categoryId])

  const formattedCatalogTitle = catalogName
    ? catalogName
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Course Catalog"

  // Dynamic sorting & search filtering
  const getProcessedCourses = (courses = []) => {
    let list = [...courses]
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (c) =>
          c.courseName?.toLowerCase().includes(q) ||
          c.courseDescription?.toLowerCase().includes(q)
      )
    }
    if (activeTab === 1) {
      // Most Popular
      list.sort(
        (a, b) =>
          (b.studentsEnroled?.length || 0) - (a.studentsEnroled?.length || 0)
      )
    } else if (activeTab === 2) {
      // Newest
      list.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      )
    } else if (activeTab === 3) {
      // Top Rated
      list.sort(
        (a, b) =>
          (b.ratingAndReviews?.length || 0) - (a.ratingAndReviews?.length || 0)
      )
    }
    return list
  }

  if (loading || profileLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900">
        <div className="spinner"></div>
      </div>
    )
  }

  if (categoryNotFound || !catalogPageData?.success) {
    return (
      <div className="min-h-screen bg-richblack-900 text-white flex flex-col justify-between">
        {/* Fallback Hero Banner */}
        <div className="bg-richblack-800 px-4 py-16 border-b border-richblack-700">
          <div className="mx-auto flex max-w-maxContent flex-col gap-4">
            <p className="text-sm text-richblack-300">
              <Link to="/" className="hover:underline">
                Home
              </Link>{" "}
              /{" "}
              <Link to="/catalog" className="hover:underline">
                Catalog
              </Link>{" "}
              / <span className="text-yellow-25">{formattedCatalogTitle}</span>
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-richblack-5">
              {formattedCatalogTitle}
            </h1>
            <p className="max-w-[870px] text-richblack-200 text-base leading-relaxed">
              Explore cutting-edge tracks and curated modules in {formattedCatalogTitle}. New specialized courses are continuously being authored and published by top educators.
            </p>
          </div>
        </div>

        {/* Empty State with CTA */}
        <div className="mx-auto my-16 flex w-11/12 max-w-maxContent flex-col items-center justify-center rounded-2xl border border-richblack-700/80 bg-richblack-800/60 p-12 text-center backdrop-blur-md">
          <div className="h-14 w-14 rounded-2xl bg-yellow-50/10 flex items-center justify-center text-yellow-50 text-2xl font-bold mb-4 border border-yellow-50/20">
            ✦
          </div>
          <h2 className="text-2xl font-semibold text-richblack-5">
            Curating New Courses for {formattedCatalogTitle}
          </h2>
          <p className="mt-2 max-w-md text-sm text-richblack-300">
            We are collaborating with senior software architects to launch industry projects and certifications for this category shortly.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/catalog"
              className="rounded-xl bg-yellow-50 px-6 py-2.5 text-sm font-semibold text-richblack-900 hover:bg-yellow-25 transition-all shadow"
            >
              Browse All Active Categories
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-richblack-600 bg-richblack-800 px-6 py-2.5 text-sm font-medium text-richblack-100 hover:bg-richblack-700 transition-all"
            >
              Request a Specific Topic
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  const selectedCategoryCourses =
    catalogPageData?.data?.selectedCategory?.courses || []
  const filteredCourses = getProcessedCourses(selectedCategoryCourses)

  return (
    <>
      {/* Hero Section */}
      <div className="box-content bg-richblack-800 px-4 py-8 border-b border-richblack-700">
        <div className="mx-auto flex min-h-[200px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </h1>
              <p className="mt-2 max-w-[870px] text-richblack-200 text-sm sm:text-base leading-relaxed">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center rounded-xl bg-richblack-700/60 px-4 py-2 text-xs font-semibold text-yellow-50 border border-yellow-50/20">
              <span>{selectedCategoryCourses.length} Courses Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Controls Bar: Live Search & Interactive Filter Tabs */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 pt-10 lg:max-w-maxContent">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-richblack-700 pb-4">
          {/* Dynamic Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(1)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 1
                  ? "bg-yellow-50 text-richblack-900 font-bold shadow"
                  : "bg-richblack-800 text-richblack-300 hover:bg-richblack-700 hover:text-white"
              }`}
            >
              <FaFire /> Most Popular
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 2
                  ? "bg-yellow-50 text-richblack-900 font-bold shadow"
                  : "bg-richblack-800 text-richblack-300 hover:bg-richblack-700 hover:text-white"
              }`}
            >
              <FaClock /> New Releases
            </button>
            <button
              onClick={() => setActiveTab(3)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 3
                  ? "bg-yellow-50 text-richblack-900 font-bold shadow"
                  : "bg-richblack-800 text-richblack-300 hover:bg-richblack-700 hover:text-white"
              }`}
            >
              <FaStar /> Top Rated
            </button>
          </div>

          {/* Live Search Input */}
          <div className="relative w-full md:w-72">
            <BiSearchAlt2 className="absolute left-3.5 top-3 text-richblack-400 text-base" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter courses in this track..."
              className="w-full rounded-xl border border-richblack-700 bg-richblack-800 py-2 pl-9 pr-3 text-xs sm:text-sm text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-50"
            />
          </div>
        </div>
      </div>

      {/* Courses Display */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-8 lg:max-w-maxContent">
        {filteredCourses.length === 0 ? (
          <div className="rounded-xl border border-richblack-700 bg-richblack-800/50 p-8 text-center text-richblack-300 text-sm">
            No courses match "{searchQuery}". Try a different keyword or reset filters.
          </div>
        ) : (
          <CourseSlider Courses={filteredCourses} />
        )}
      </div>

      {/* Section 2: Related Category Courses */}
      {catalogPageData?.data?.differentCategory?.courses?.length > 0 && (
        <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-10 lg:max-w-maxContent">
          <div className="section_heading">
            Popular in {catalogPageData?.data?.differentCategory?.name}
          </div>
          <div className="py-6">
            <CourseSlider
              Courses={catalogPageData?.data?.differentCategory?.courses}
            />
          </div>
        </div>
      )}

      {/* Section 3: Frequently Bought Grid */}
      {catalogPageData?.data?.mostSellingCourses?.length > 0 && (
        <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-10 lg:max-w-maxContent">
          <div className="section_heading">Frequently Enrolled Together</div>
          <div className="py-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {catalogPageData?.data?.mostSellingCourses
                ?.slice(0, 4)
                .map((course, i) => (
                  <CourseCard course={course} key={i} Height={"h-[400px]"} />
                ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default Catalog
