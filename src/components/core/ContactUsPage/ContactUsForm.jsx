import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { FaPaperPlane } from "react-icons/fa"

import CountryCode from "../../../data/countrycode.json"
import { apiConnector } from "../../../services/apiConnector"
import { contactusEndpoint } from "../../../services/apis"

const topics = [
  "Course Guidance",
  "Technical Support",
  "Certificate Inquiry",
  "Enterprise Training",
  "Affiliate & Partnerships",
]

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState("")
  const [messageChars, setMessageChars] = useState(0)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const messageValue = watch("message", "")

  useEffect(() => {
    setMessageChars(messageValue ? messageValue.length : 0)
  }, [messageValue])

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic)
    setValue(
      "message",
      `Hello StudyNotion Support,\n\nI am reaching out regarding: ${topic}.\n\n`
    )
  }

  const submitContactForm = async (data) => {
    try {
      setLoading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        { ...data, subject: selectedTopic || "General Inquiry" }
      )
      if (res?.data?.success) {
        toast.success("Message delivered successfully! We will reply shortly.")
      }
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      toast.error("Could not send message. Please try again or email us directly.")
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
      setSelectedTopic("")
      setMessageChars(0)
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(submitContactForm)}
    >
      {/* Live Support Status Pill */}
      <div className="flex items-center justify-between rounded-xl border border-yellow-50/20 bg-yellow-50/5 p-3 text-xs">
        <span className="flex items-center gap-2 font-medium text-yellow-50">
          <span className="h-2 w-2 rounded-full bg-caribbeangreen-100 animate-pulse"></span>
          Support Team Online
        </span>
        <span className="text-richblack-400">Average response: &lt; 15 mins</span>
      </div>

      {/* Quick Topic Selector Pills */}
      <div>
        <p className="mb-2 text-xs font-semibold text-richblack-300">
          Select Topic (Optional):
        </p>
        <div className="flex flex-wrap gap-2">
          {topics.map((t, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => handleSelectTopic(t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                selectedTopic === t
                  ? "bg-yellow-50 text-richblack-900 font-semibold shadow"
                  : "bg-richblack-800 text-richblack-300 hover:bg-richblack-700 hover:text-white border border-richblack-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="lable-style">
            First Name <span className="text-pink-200">*</span>
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="form-style"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your first name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="form-style"
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address <span className="text-pink-200">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="form-style"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number <span className="text-pink-200">*</span>
        </label>

        <div className="flex gap-4">
          <div className="flex w-[90px] flex-col gap-2">
            <select
              type="text"
              name="countrycode"
              id="countrycode"
              className="form-style"
              defaultValue="+91"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} ({ele.country})
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="tel"
              name="phonenumber"
              id="phonenumber"
              placeholder="98765 43210"
              className="form-style"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 8, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="message" className="lable-style">
            Message <span className="text-pink-200">*</span>
          </label>
          <span className="text-[11px] text-richblack-400">
            {messageChars} characters
          </span>
        </div>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="6"
          placeholder="How can we help you achieve your learning or career goals?"
          className="form-style"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`flex items-center justify-center gap-2 rounded-xl bg-yellow-50 px-6 py-3 text-center text-sm font-bold text-richblack-900 shadow transition-all duration-200 hover:bg-yellow-25 hover:scale-[1.02] disabled:opacity-50`}
      >
        <FaPaperPlane />
        <span>{loading ? "Sending Message..." : "Send Message"}</span>
      </button>
    </form>
  )
}

export default ContactUsForm
