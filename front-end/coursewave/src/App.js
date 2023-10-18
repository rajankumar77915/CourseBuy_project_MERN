import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NavBar from "./Componant/NavBar";
import UpdatePassword from "./pages/UpdatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import IsExist from "./Componant/Auth/IsExist";
import About from "./pages/About";
import PrivateRoute from "./Componant/Auth/PrivateRoute";
import { useSelector } from "react-redux";
import Contact from "./pages/Contact";
import Settings from "./Componant/Dashboard/Settings"
import { ACCOUNT_TYPE } from "./utils/constants";
import MyProfile from "./Componant/Dashboard/MyProfile"
import Cart from "./Componant/Dashboard/Cart"
import EnrolledCourses from "./Componant/Dashboard/EnrolledCourses"
import Error from "./pages/Error"
import AddCourse from "./Componant/Dashboard/AddCourse";
import Instructor from "./Componant/Dashboard/InstructorDashboard/Instructor";
import MyCourses from "./Componant/Dashboard/MyCourses";
import EditCourse from "./Componant/Dashboard/EditCourse";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./Componant/ViewCourse/VideoDetails";
import CourseDetails from "./pages/CourseDetails"
import Catalog from "./pages/Catalog";

function App() {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        {/* Open Route - for Only Non Logged in User */}
        <Route
          path="login"
          element={
            <IsExist>
              <Login />
            </IsExist>
          }
        />
        <Route
          path="forgot-password"
          element={
            <IsExist>
              <ForgotPassword />
            </IsExist>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <IsExist>
              <UpdatePassword />
            </IsExist>
          }
        />
        <Route
          path="signup"
          element={
            <IsExist>
              <Signup />
            </IsExist>
          }
        />
        <Route
          path="verify-email"
          element={
            <IsExist>
              <VerifyEmail />
            </IsExist>
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
