import React from "react";
import ContactUsForm from "../ContactUsPage/ContactUsForm";
import { HiChatBubbleLeftRight, HiOutlineShieldCheck, HiOutlineClock } from "react-icons/hi2";
import { IoMailOutline } from "react-icons/io5";

const ContactFormSection = () => {
  return (
    <div className="w-full max-w-maxContent mx-auto my-12">
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10">
        {/* Left Column: Information & Help Highlights */}
        <div className="lg:w-[45%] flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full bg-richblack-800 border border-richblack-700 px-4 py-1.5 text-xs font-semibold text-yellow-50 uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="text-3xl lg:text-4xl font-semibold text-richblack-5">
              Let&apos;s Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-200">Extraordinary</span> Together
            </h1>
            <p className="text-richblack-300 text-base leading-relaxed">
              Have questions about our course roadmaps, certifications, or enterprise packages? Our dedicated academic advisors and engineering mentors are here to guide your learning journey every step of the way.
            </p>
          </div>

          {/* Value cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="flex items-start gap-4 rounded-xl bg-richblack-800/60 border border-richblack-700/60 p-4 transition-all hover:border-richblack-600">
              <div className="rounded-lg bg-richblack-700/80 p-3 text-yellow-50 text-xl">
                <HiChatBubbleLeftRight />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-richblack-25">1-on-1 Academic Advisory</h3>
                <p className="text-xs text-richblack-300 mt-0.5">
                  Get personalized recommendations on suitable tracks and career paths.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl bg-richblack-800/60 border border-richblack-700/60 p-4 transition-all hover:border-richblack-600">
              <div className="rounded-lg bg-richblack-700/80 p-3 text-yellow-50 text-xl">
                <HiOutlineClock />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-richblack-25">24-Hour Response Guarantee</h3>
                <p className="text-xs text-richblack-300 mt-0.5">
                  Our support specialists answer all inquiries within one business day.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl bg-richblack-800/60 border border-richblack-700/60 p-4 transition-all hover:border-richblack-600">
              <div className="rounded-lg bg-richblack-700/80 p-3 text-yellow-50 text-xl">
                <IoMailOutline />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-richblack-25">Direct Email Support</h3>
                <p className="text-xs text-richblack-300 mt-0.5">
                  Email us directly at <span className="text-yellow-50 font-medium">info@studynotion.com</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl bg-richblack-800/60 border border-richblack-700/60 p-4 transition-all hover:border-richblack-600">
              <div className="rounded-lg bg-richblack-700/80 p-3 text-yellow-50 text-xl">
                <HiOutlineShieldCheck />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-richblack-25">Enterprise &amp; Campus Cohorts</h3>
                <p className="text-xs text-richblack-300 mt-0.5">
                  Specialized bulk licenses and tailored curriculum for organizations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:w-[55%] rounded-2xl border border-richblack-700/80 bg-richblack-800/90 p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-richblack-5">Send Us a Message</h2>
            <p className="text-sm text-richblack-300 mt-1">
              Fill out the details below and we&apos;ll get back to you promptly.
            </p>
          </div>
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
