import React from "react"
import { Link } from "react-router-dom"

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png"

// Icons
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa"

const BottomFooter = [
  { title: "Privacy Policy", link: "/privacy-policy" },
  { title: "Cookie Policy", link: "/cookie-policy" },
  { title: "Terms of Service", link: "/terms" },
]

const CompanyLinks = [
  { title: "About Us", link: "/about" },
  { title: "Careers", link: "/careers" },
  { title: "Affiliates", link: "/affiliates" },
  { title: "Contact Us", link: "/contact" },
  { title: "Become Instructor", link: "/signup" },
]

const ResourcesLinks = [
  { title: "Course Catalog", link: "/catalog" },
  { title: "Career Roadmaps", link: "/catalog" },
  { title: "Documentation", link: "/docs" },
  { title: "Code Challenges", link: "/code-challenges" },
  { title: "Help Center", link: "/help-center" },
]

const DomainLinks = [
  { title: "Web Development", link: "/catalog/web-development" },
  { title: "Python & AI", link: "/catalog/python" },
  { title: "Cloud Computing", link: "/catalog/cloud-computing" },
  { title: "Data Science", link: "/catalog/data-science" },
  { title: "Android Dev", link: "/catalog/android-development" },
  { title: "All Domains →", link: "/catalog" },
]

const LanguagesLinks = [
  { title: "JavaScript", link: "/catalog/javascript" },
  { title: "Python", link: "/catalog/python" },
  { title: "Java", link: "/catalog/java" },
  { title: "C++", link: "/catalog/c++" },
  { title: "Interview Prep", link: "/interview-prep" },
  { title: "Certifications", link: "/professional-certification" },
]

const Footer = () => {
  return (
    <footer className="border-t border-richblack-700 bg-richblack-800 text-richblack-400">
      <div className="mx-auto w-11/12 max-w-maxContent py-10 lg:py-12">
        {/* Main Grid: 5 Balanced Columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {/* Column 1: Brand & Bio (Spans 2 columns on lg) */}
          <div className="col-span-2 flex flex-col justify-between pr-0 lg:pr-6">
            <div className="flex flex-col gap-3">
              <Link to="/" className="inline-block">
                <img
                  src={Logo}
                  alt="StudyNotion Logo"
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <p className="max-w-sm text-xs leading-relaxed text-richblack-300">
                Empowering the next generation of engineers with hands-on coding
                labs, production projects, and verified credentials.
              </p>
            </div>

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="https://x.com/ShivamP55805341"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-richblack-700 text-richblack-200 transition-all hover:bg-yellow-50 hover:text-richblack-900 active:scale-95"
                title="Twitter"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="https://github.com/Shivamp1819"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-richblack-700 text-richblack-200 transition-all hover:bg-yellow-50 hover:text-richblack-900 active:scale-95"
                title="GitHub"
              >
                <FaGithub size={14} />
              </a>
              <a
                href="https://youtube.com/@shivampatel6928"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-richblack-700 text-richblack-200 transition-all hover:bg-yellow-50 hover:text-richblack-900 active:scale-95"
                title="YouTube"
              >
                <FaYoutube size={14} />
              </a>
              <a
                href="https://www.linkedin.com/in/shivam-patel-mrsp"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-richblack-700 text-richblack-200 transition-all hover:bg-yellow-50 hover:text-richblack-900 active:scale-95"
                title="LinkedIn"
              >
                <FaLinkedin size={14} />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-richblack-700 text-richblack-200 transition-all hover:bg-yellow-50 hover:text-richblack-900 active:scale-95"
                title="Facebook"
              >
                <FaFacebook size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold tracking-wide text-richblack-50">
              Company
            </h3>
            <ul className="flex flex-col gap-2 text-xs">
              {CompanyLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.link}
                    className="transition-colors hover:text-yellow-50"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold tracking-wide text-richblack-50">
              Resources
            </h3>
            <ul className="flex flex-col gap-2 text-xs">
              {ResourcesLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.link}
                    className="transition-colors hover:text-yellow-50"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Top Domains */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold tracking-wide text-richblack-50">
              Domains
            </h3>
            <ul className="flex flex-col gap-2 text-xs">
              {DomainLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.link}
                    className={`transition-colors hover:text-yellow-50 ${
                      item.title.includes("→") ? "font-semibold text-yellow-50" : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Languages & Tracks */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold tracking-wide text-richblack-50">
              Languages & Career
            </h3>
            <ul className="flex flex-col gap-2 text-xs">
              {LanguagesLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.link}
                    className="transition-colors hover:text-yellow-50"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-richblack-700/70 pt-6 text-xs sm:flex-row">
          {/* Legal / Policy links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-richblack-400">
            {BottomFooter.map((item, idx) => (
              <span key={idx} className="flex items-center gap-4">
                <Link
                  to={item.link}
                  className="transition-colors hover:text-yellow-50"
                >
                  {item.title}
                </Link>
                {idx < BottomFooter.length - 1 && (
                  <span className="text-richblack-600">•</span>
                )}
              </span>
            ))}
          </div>

          {/* Copyright text */}
          <p className="text-center text-richblack-400 sm:text-right">
            Made by{" "}
            <span className="font-semibold text-richblack-200">
              Shivam Patel (mrsp.)
            </span>{" "}
            © 2025 StudyNotion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
