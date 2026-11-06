import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
import { FaStar } from "react-icons/fa"
import { Autoplay, FreeMode, Pagination } from "swiper"

import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"

const fallbackReviews = [
  {
    user: {
      firstName: "Aarav",
      lastName: "Sharma",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Aarav%20Sharma",
    },
    course: { courseName: "Full Stack Web Development" },
    review:
      "The curriculum is top-notch! The hands-on projects helped me land my first software engineer role within 3 months.",
    rating: 5.0,
  },
  {
    user: {
      firstName: "Priya",
      lastName: "Nair",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Priya%20Nair",
    },
    course: { courseName: "Python & Machine Learning" },
    review:
      "Clear explanations, great real-world coding examples, and amazing community support whenever I got stuck.",
    rating: 4.9,
  },
  {
    user: {
      firstName: "Rohan",
      lastName: "Verma",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Rohan%20Verma",
    },
    course: { courseName: "Cloud DevOps & Kubernetes" },
    review:
      "Best course platform I have experienced. The step-by-step CI/CD pipeline deployments were exceptional.",
    rating: 5.0,
  },
  {
    user: {
      firstName: "Ananya",
      lastName: "Iyer",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Ananya%20Iyer",
    },
    course: { courseName: "React & Next.js Advanced" },
    review:
      "The instructors teach production-ready patterns and clean code principles. Highly recommended for every dev!",
    rating: 4.8,
  },
  {
    user: {
      firstName: "Devendra",
      lastName: "Singh",
      image: "https://api.dicebear.com/5.x/initials/svg?seed=Devendra%20Singh",
    },
    course: { courseName: "Data Structures & Algorithms" },
    review:
      "Mastered tricky DSA concepts easily. Solved 150+ problems and cleared tech rounds at my dream company.",
    rating: 5.0,
  },
]

function ReviewSlider() {
  const [reviews, setReviews] = useState(fallbackReviews)
  const truncateWords = 15

  useEffect(() => {
    ; (async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success && data?.data?.length > 0) {
          setReviews(data?.data)
        }
      } catch (error) {
        console.log("Could not fetch reviews, using fallback.", error)
      }
    })()
  }, [])

  return (
    <div className="text-white w-full">
      <div className="my-[40px] max-w-maxContent mx-auto">
        <Swiper
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i} className="h-auto">
                <div className="flex flex-col justify-between h-full gap-4 rounded-2xl border border-richblack-700/80 bg-richblack-800/90 p-5 text-[14px] text-richblack-25 shadow-lg backdrop-blur-sm transition-all hover:border-yellow-50/40 hover:scale-[1.02]">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName || "Learner"} ${review?.user?.lastName || ""}`
                      }
                      alt="Student Avatar"
                      className="h-10 w-10 rounded-full object-cover border border-richblack-600"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5 text-sm">{`${review?.user?.firstName || "Student"} ${review?.user?.lastName || ""}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-400">
                        {review?.course?.courseName || "Featured Program"}
                      </h2>
                    </div>
                  </div>

                  <p className="font-normal text-richblack-100 text-sm leading-relaxed min-h-[60px]">
                    &ldquo;
                    {review?.review?.split(" ").length > truncateWords
                      ? `${review?.review
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ")}...`
                      : review?.review}
                    &rdquo;
                  </p>

                  <div className="flex items-center gap-2 pt-2 border-t border-richblack-700/60">
                    <span className="font-semibold text-yellow-100 text-sm">
                      {(review.rating || 5).toFixed(1)}
                    </span>
                    <ReactStars
                      count={5}
                      value={review.rating || 5}
                      size={18}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
