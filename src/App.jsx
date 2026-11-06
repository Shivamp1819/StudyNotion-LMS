import { useEffect } from "react"
import "./App.css"
// Redux
import { useDispatch, useSelector } from "react-redux"
// React Router
import { Route, Routes, useNavigate } from "react-router-dom"

// Components
import Navbar from "./components/Common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import AddCourse from "./components/core/Dashboard/AddCourse"
import Cart from "./components/core/Dashboard/Cart"
import EditCourse from "./components/core/Dashboard/EditCourse"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import Instructor from "./components/core/Dashboard/Instructor"
import MyCourses from "./components/core/Dashboard/MyCourses"
import MyProfile from "./components/core/Dashboard/MyProfile"
import Settings from "./components/core/Dashboard/Settings"
import VideoDetails from "./components/core/ViewCourse/VideoDetails"
import About from "./pages/About"
import AllCatalog from "./pages/AllCatalog"
import Catalog from "./pages/Catalog"
import Contact from "./pages/Contact"
import CourseDetails from "./pages/CourseDetails"
import Dashboard from "./pages/Dashboard"
import Error from "./pages/Error"
import ForgotPassword from "./pages/ForgotPassword"
import StaticInfo from "./pages/StaticInfo"
// Pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail"
import ViewCourse from "./pages/ViewCourse"
import { getUserDetails } from "./services/operations/profileAPI"
import { ACCOUNT_TYPE } from "./utils/constants"

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    // Proactively warm up backend container (eliminates free-tier sleep delay)
    const backendBase = process.env.REACT_APP_BASE_URL || "https://studynotion-lms-0v13.onrender.com/api/v1"
    const rootUrl = backendBase.replace(/\/api\/v1\/?$/, "")
    fetch(rootUrl, { mode: "no-cors" }).catch(() => {})

    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/catalog" element={<AllCatalog />} />
        <Route path="/categories" element={<AllCatalog />} />
        <Route path="/full-catalog" element={<AllCatalog />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />

        {/* Career & Technical Resource Hub Pages */}
        <Route path="/interview-prep" element={<StaticInfo />} />
        <Route path="/professional-certification" element={<StaticInfo />} />
        <Route path="/certifications" element={<StaticInfo />} />
        <Route path="/career-paths" element={<StaticInfo />} />
        <Route path="/career-services" element={<StaticInfo />} />
        <Route path="/code-challenges" element={<StaticInfo />} />
        <Route path="/docs" element={<StaticInfo />} />
        <Route path="/chart-sheet" element={<StaticInfo />} />
        <Route path="/cheat-sheet" element={<StaticInfo />} />
        <Route path="/help-center" element={<StaticInfo />} />
        <Route path="/faq" element={<StaticInfo />} />
        <Route path="/careers" element={<StaticInfo />} />
        <Route path="/affiliates" element={<StaticInfo />} />
        <Route path="/community" element={<StaticInfo />} />
        <Route path="/forums" element={<StaticInfo />} />
        <Route path="/chapters" element={<StaticInfo />} />
        <Route path="/events" element={<StaticInfo />} />
        <Route path="/articles" element={<StaticInfo />} />
        <Route path="/blog" element={<StaticInfo />} />
        <Route path="/projects" element={<StaticInfo />} />
        <Route path="/videos" element={<StaticInfo />} />
        <Route path="/workspaces" element={<StaticInfo />} />
        <Route path="/paid-memberships" element={<StaticInfo />} />
        <Route path="/for-students" element={<StaticInfo />} />
        <Route path="/business-solutions" element={<StaticInfo />} />
        <Route path="/beta-content" element={<StaticInfo />} />

        {/* Legal & Policy Pages */}
        <Route path="/privacy-policy" element={<StaticInfo />} />
        <Route path="/terms" element={<StaticInfo />} />
        <Route path="/terms-of-service" element={<StaticInfo />} />
        <Route path="/cookie-policy" element={<StaticInfo />} />

        {/* Direct Subject & Technology Catalog Routes */}
        <Route path="/web-development" element={<Catalog />} />
        <Route path="/python" element={<Catalog />} />
        <Route path="/javascript" element={<Catalog />} />
        <Route path="/c++" element={<Catalog />} />
        <Route path="/java" element={<Catalog />} />
        <Route path="/cloud-computing" element={<Catalog />} />
        <Route path="/machine-learning" element={<Catalog />} />
        <Route path="/data-science" element={<Catalog />} />
        <Route path="/data-analytics" element={<Catalog />} />
        <Route path="/data-visualization" element={<Catalog />} />
        <Route path="/developer-tools" element={<Catalog />} />
        <Route path="/devops" element={<Catalog />} />
        <Route path="/game-development" element={<Catalog />} />
        <Route path="/cybersecurity" element={<Catalog />} />
        <Route path="/mobile-development" element={<Catalog />} />
        <Route path="/web-design" element={<Catalog />} />
        <Route path="/math" element={<Catalog />} />
        <Route path="/it" element={<Catalog />} />
        <Route path="/code-foundations" element={<Catalog />} />
        <Route path="/computer-science" element={<Catalog />} />
        <Route path="/bash" element={<Catalog />} />
        <Route path="/csharp" element={<Catalog />} />
        <Route path="/go" element={<Catalog />} />
        <Route path="/html-css" element={<Catalog />} />
        <Route path="/kotlin" element={<Catalog />} />
        <Route path="/php" element={<Catalog />} />
        <Route path="/r" element={<Catalog />} />
        <Route path="/ruby" element={<Catalog />} />
        <Route path="/sql" element={<Catalog />} />
        <Route path="/swift" element={<Catalog />} />
        <Route path="/al" element={<Catalog />} />
        {/* Open Route - for Only Non Logged in User */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        {/* Private Route - for Only Logged in User */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Route for all users */}
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />
          {/* Route only for Instructors */}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
          {/* Route only for Students */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}
          <Route path="dashboard/settings" element={<Settings />} />
        </Route>

        {/* For the watching course lectures */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
