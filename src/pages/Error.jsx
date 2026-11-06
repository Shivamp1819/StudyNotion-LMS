import React from "react"
import { Link } from "react-router-dom"
import { FaHome, FaCompass, FaEnvelope } from "react-icons/fa"

function Error() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-full bg-richblack-800 border border-richblack-700 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-yellow-50 mb-6">
        404 Not Found
      </div>
      <h1 className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-200">
        404
      </h1>
      <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-richblack-5">
        Oops! Page Under Construction or Not Found
      </h2>
      <p className="mt-3 max-w-md text-sm sm:text-base text-richblack-300">
        The page you are looking for might have been removed, had its name changed, or is currently being crafted by our team.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl bg-yellow-50 px-6 py-3 text-sm font-semibold text-richblack-900 shadow-md transition-all hover:bg-yellow-25 active:scale-98"
        >
          <FaHome /> Back to Home
        </Link>
        <Link
          to="/catalog"
          className="flex items-center gap-2 rounded-xl border border-richblack-700 bg-richblack-800 px-6 py-3 text-sm font-medium text-richblack-100 transition-all hover:bg-richblack-700 active:scale-98"
        >
          <FaCompass /> Explore Catalog
        </Link>
        <Link
          to="/contact"
          className="flex items-center gap-2 rounded-xl border border-richblack-700 bg-richblack-800 px-6 py-3 text-sm font-medium text-richblack-100 transition-all hover:bg-richblack-700 active:scale-98"
        >
          <FaEnvelope /> Contact Us
        </Link>
      </div>
    </div>
  )
}

export default Error
