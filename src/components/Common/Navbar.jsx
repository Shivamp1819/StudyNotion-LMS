import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

const defaultCategories = [
  { name: "Web Development", path: "/catalog/web-development" },
  { name: "Python Programming", path: "/catalog/python" },
  { name: "JavaScript Mastery", path: "/catalog/javascript" },
  { name: "Android & Mobile Dev", path: "/catalog/android-development" },
  { name: "Data Science & AI", path: "/catalog/data-science" },
  { name: "Cloud Computing & DevOps", path: "/catalog/cloud-computing" },
]

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState(defaultCategories)
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    ; (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        if (res?.data?.data && res.data.data.length > 0) {
          setSubLinks(res.data.data)
        }
      } catch (error) {
        console.log("Could not fetch Categories, using fallback catalog.", error)
      }
      setLoading(false)
    })()
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const getCatalogLink = (subLink) => {
    if (subLink.path) return subLink.path
    if (subLink.link) return subLink.link
    const name = subLink.name || subLink.title || "courses"
    return `/catalog/${name.split(" ").join("-").toLowerCase()}`
  }

  return (
    <div
      className={`relative z-50 flex h-14 items-center justify-center border-b border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-900/90 backdrop-blur-md" : "bg-richblack-900"
        } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="StudyNotion Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Navigation links - Desktop */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="group relative flex cursor-pointer items-center gap-1.5 py-4">
                    <Link
                      to="/catalog"
                      className={`flex items-center gap-1 transition-colors ${matchRoute("/catalog") || matchRoute("/catalog/:catalogName")
                          ? "text-yellow-50 font-semibold"
                          : "text-richblack-25 hover:text-yellow-50"
                        }`}
                    >
                      <span>{link.title}</span>
                      <BsChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    {/* Dark Glassmorphic Dropdown */}
                    <div className="invisible absolute left-1/2 top-[80%] z-[1000] flex w-[320px] -translate-x-1/2 translate-y-3 flex-col rounded-2xl border border-richblack-700/80 bg-richblack-800/95 p-4 text-richblack-25 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {/* Arrow tip */}
                      <div className="absolute left-1/2 top-0 -z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-t border-l border-richblack-700/80 bg-richblack-800"></div>

                      <div className="mb-2 flex items-center justify-between border-b border-richblack-700/60 pb-2.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-richblack-300">
                          Course Domains
                        </span>
                        <Link
                          to="/catalog"
                          className="text-xs font-semibold text-yellow-50 transition-colors hover:text-yellow-25"
                        >
                          All Categories &rarr;
                        </Link>
                      </div>

                      <div className="max-h-[260px] overflow-y-auto pr-1 flex flex-col gap-1">
                        {loading ? (
                          <div className="py-6 text-center text-xs text-richblack-400">
                            Loading catalog...
                          </div>
                        ) : subLinks && subLinks.length > 0 ? (
                          subLinks.map((subLink, i) => (
                            <Link
                              to={getCatalogLink(subLink)}
                              className="group/item flex items-center justify-between rounded-xl px-3 py-2 text-sm text-richblack-100 transition-all duration-150 hover:bg-richblack-700/70 hover:text-yellow-50"
                              key={i}
                            >
                              <span className="font-medium">
                                {subLink.name || subLink.title}
                              </span>
                              <span className="text-xs text-richblack-400 transition-transform group-hover/item:translate-x-1">
                                &rarr;
                              </span>
                            </Link>
                          ))
                        ) : (
                          <p className="py-4 text-center text-xs text-richblack-400">
                            No Categories Available
                          </p>
                        )}
                      </div>

                      <div className="mt-3 border-t border-richblack-700/60 pt-3">
                        <Link
                          to="/catalog"
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 py-2 text-center text-xs font-bold text-richblack-900 shadow-md transition-all hover:brightness-110 active:scale-98"
                        >
                          Explore Full Catalog &amp; Roadmaps &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`transition-colors hover:text-yellow-50 ${matchRoute(link?.path)
                          ? "text-yellow-50 font-semibold"
                          : "text-richblack-25"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard / Cart - Desktop */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative p-2">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100 transition-colors hover:text-yellow-50" />
              {totalItems > 0 && (
                <span className="absolute 0 right-0 grid h-5 w-5 place-items-center rounded-full bg-yellow-50 text-center text-xs font-bold text-richblack-900 animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="rounded-xl border border-richblack-700 bg-richblack-800 px-4 py-2 text-sm font-medium text-richblack-100 transition-all hover:border-richblack-600 hover:bg-richblack-700 hover:text-white active:scale-98">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="rounded-xl bg-yellow-50 px-4 py-2 text-sm font-semibold text-richblack-900 shadow-sm transition-all hover:bg-yellow-25 active:scale-98">
                Sign up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropdown />}
        </div>

        {/* Hamburger Icon - Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-richblack-100 hover:bg-richblack-800 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <AiOutlineClose fontSize={24} />
          ) : (
            <AiOutlineMenu fontSize={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full border-b border-richblack-700 bg-richblack-800/95 p-6 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-4 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path || "/"}
                  className={`block py-2 text-base font-medium ${matchRoute(link.path) ? "text-yellow-50" : "text-richblack-25"
                    }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/catalog"
                className="block rounded-lg bg-richblack-700/60 px-4 py-2 text-sm font-medium text-yellow-50"
              >
                Browse All Categories &rarr;
              </Link>
            </li>
          </ul>

          <div className="mt-6 flex flex-col gap-3 border-t border-richblack-700 pt-4">
            {token === null ? (
              <>
                <Link to="/login" className="w-full">
                  <button className="w-full rounded-xl border border-richblack-700 bg-richblack-800 py-2.5 text-center text-sm font-medium text-richblack-100">
                    Log in
                  </button>
                </Link>
                <Link to="/signup" className="w-full">
                  <button className="w-full rounded-xl bg-yellow-50 py-2.5 text-center text-sm font-semibold text-richblack-900">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <Link to="/dashboard/my-profile" className="text-sm text-yellow-50 font-medium">
                  Go to Dashboard &rarr;
                </Link>
                {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                  <Link to="/dashboard/cart" className="flex items-center gap-2 text-sm text-richblack-100">
                    <AiOutlineShoppingCart className="text-xl" />
                    <span>Cart ({totalItems})</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
