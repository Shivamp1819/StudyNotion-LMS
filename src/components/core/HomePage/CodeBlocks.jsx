import React, { useState } from "react"
import CTAButton from "./Button"
import { TypeAnimation } from "react-type-animation"
import { FaArrowRight, FaCopy, FaCheck } from "react-icons/fa"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
  filename = "App.jsx",
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    copy(codeblock)
    setCopied(true)
    toast.success("Code copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>
      {/* Section 1 */}
      <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
        {heading}

        {/* Sub Heading */}
        <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
          {subheading}
        </div>

        {/* Button Group */}
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2: Interactive Terminal Window */}
      <div className="relative w-[100%] lg:w-[470px]">
        {backgroundGradient}
        <div className="overflow-hidden rounded-2xl border border-richblack-700/80 bg-richblack-900/90 shadow-2xl backdrop-blur-md">
          {/* macOS-style Terminal Top Bar */}
          <div className="flex items-center justify-between border-b border-richblack-700/80 bg-richblack-800/90 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56] inline-block shadow-sm"></span>
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E] inline-block shadow-sm"></span>
              <span className="h-3 w-3 rounded-full bg-[#27C93F] inline-block shadow-sm"></span>
              <span className="ml-2 text-xs font-mono font-medium text-richblack-300">
                {filename}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-richblack-300 transition-colors hover:bg-richblack-700 hover:text-yellow-50"
              title="Copy snippet"
            >
              {copied ? <FaCheck className="text-caribbeangreen-100" /> : <FaCopy />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          {/* Code Area with Line Numbers */}
          <div className="flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6">
            {/* Indexing */}
            <div className="text-center flex flex-col w-[10%] select-none text-richblack-500 font-mono font-bold">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => (
                <p key={n}>{n}</p>
              ))}
            </div>

            {/* Code */}
            <div
              className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
            >
              <TypeAnimation
                sequence={[codeblock, 1200, ""]}
                cursor={true}
                repeat={Infinity}
                style={{
                  whiteSpace: "pre-line",
                  display: "block",
                }}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks
