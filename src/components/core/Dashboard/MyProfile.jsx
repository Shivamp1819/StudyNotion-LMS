import React from "react"
import { RiEditBoxLine } from "react-icons/ri"
import { FaCopy, FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../Common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  // Dynamic Profile Completeness calculation
  const fields = [
    user?.firstName,
    user?.lastName,
    user?.email,
    user?.image,
    user?.additionalDetails?.about,
    user?.additionalDetails?.contactNumber,
    user?.additionalDetails?.gender,
    user?.additionalDetails?.dateOfBirth,
  ]
  const completedFields = fields.filter(Boolean).length
  const completionPercentage = Math.round((completedFields / fields.length) * 100)

  const handleCopyProfileId = () => {
    if (user?._id) {
      copy(user._id)
      toast.success("Profile ID copied to clipboard!")
    } else {
      copy(window.location.href)
      toast.success("Profile link copied to clipboard!")
    }
  }

  return (
    <>
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-richblack-5">My Profile</h1>
          <p className="mt-1 text-sm text-richblack-400">
            Manage your personal profile, learning credentials, and account settings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyProfileId}
            className="flex items-center gap-1.5 rounded-xl border border-richblack-700 bg-richblack-800 px-4 py-2 text-xs font-semibold text-richblack-200 hover:bg-richblack-700 hover:text-white transition-all shadow"
            title="Copy unique account ID"
          >
            <FaCopy /> Copy ID
          </button>
          <IconBtn
            text="Edit Profile"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>

      {/* Dynamic Profile Completeness Card */}
      <div className="mb-8 rounded-2xl border border-richblack-700 bg-richblack-800/90 p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-richblack-5">
                Profile Completeness
              </span>
              <span className="rounded-full bg-yellow-50/10 border border-yellow-50/20 px-2.5 py-0.5 text-xs font-bold text-yellow-50">
                {completionPercentage}% Complete
              </span>
            </div>
            <p className="mt-1 text-xs text-richblack-400">
              {completionPercentage === 100
                ? "Your profile is fully completed and verified!"
                : "Complete your bio, contact number, and date of birth in settings to unlock verified certificates."}
            </p>
          </div>
          {completionPercentage < 100 && (
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="self-start sm:self-auto rounded-lg bg-yellow-50/10 border border-yellow-50/30 px-3 py-1.5 text-xs font-semibold text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 transition-all"
            >
              Complete Profile →
            </button>
          )}
        </div>
        {/* Progress bar track */}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-richblack-700">
          <div
            className="h-full bg-gradient-to-r from-yellow-50 to-orange-400 transition-all duration-500 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl border border-richblack-700 bg-richblack-800 p-8">
        <div className="flex items-center gap-x-5">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover border-2 border-yellow-50/30 shadow-lg"
          />
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-richblack-5">
                {user?.firstName + " " + user?.lastName}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-md bg-richblack-700 px-2.5 py-0.5 text-xs font-semibold text-yellow-50">
                {user?.accountType === "Instructor" ? (
                  <>
                    <FaChalkboardTeacher /> Instructor
                  </>
                ) : (
                  <>
                    <FaGraduationCap /> Student
                  </>
                )}
              </span>
            </div>
            <p className="text-sm text-richblack-300 font-mono">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* About Section */}
      <div className="my-8 flex flex-col gap-y-6 rounded-2xl border border-richblack-700 bg-richblack-800 p-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-bold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-200 leading-relaxed"
              : "text-richblack-400 italic"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ||
            "Write something about your engineering interests, goals, and experience in settings..."}
        </p>
      </div>

      {/* Personal Details Section */}
      <div className="my-8 flex flex-col gap-y-6 rounded-2xl border border-richblack-700 bg-richblack-800 p-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-bold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-richblack-700/60 bg-richblack-900/40 p-4">
            <p className="text-xs text-richblack-400 font-medium">First Name</p>
            <p className="mt-1 text-sm font-semibold text-richblack-5">
              {user?.firstName || "—"}
            </p>
          </div>
          <div className="rounded-xl border border-richblack-700/60 bg-richblack-900/40 p-4">
            <p className="text-xs text-richblack-400 font-medium">Last Name</p>
            <p className="mt-1 text-sm font-semibold text-richblack-5">
              {user?.lastName || "—"}
            </p>
          </div>
          <div className="rounded-xl border border-richblack-700/60 bg-richblack-900/40 p-4">
            <p className="text-xs text-richblack-400 font-medium">Email Address</p>
            <p className="mt-1 text-sm font-semibold text-richblack-5 truncate">
              {user?.email || "—"}
            </p>
          </div>
          <div className="rounded-xl border border-richblack-700/60 bg-richblack-900/40 p-4">
            <p className="text-xs text-richblack-400 font-medium">Phone Number</p>
            <p className="mt-1 text-sm font-semibold text-richblack-5">
              {user?.additionalDetails?.contactNumber || "Add Contact Number"}
            </p>
          </div>
          <div className="rounded-xl border border-richblack-700/60 bg-richblack-900/40 p-4">
            <p className="text-xs text-richblack-400 font-medium">Gender</p>
            <p className="mt-1 text-sm font-semibold text-richblack-5">
              {user?.additionalDetails?.gender || "Add Gender"}
            </p>
          </div>
          <div className="rounded-xl border border-richblack-700/60 bg-richblack-900/40 p-4">
            <p className="text-xs text-richblack-400 font-medium">Date Of Birth</p>
            <p className="mt-1 text-sm font-semibold text-richblack-5">
              {user?.additionalDetails?.dateOfBirth
                ? formattedDate(user.additionalDetails.dateOfBirth)
                : "Add Date Of Birth"}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
