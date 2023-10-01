import { Route,Routes } from "react-router-dom";
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


function App() {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
     <NavBar/>
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route
           path="signup"
           element={
             <IsExist>
               <Signup />
             </IsExist>
           }
         />
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
           path="verify-email"
           element={
             <IsExist>
               <VerifyEmail />
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
           path="about"
           element={
             <IsExist>
               <About />
             </IsExist>
           }
         />
     <Route path="/contact" element={<Contact />} />
 
     <Route 
       element={
         <PrivateRoute>
           <Dashboard />
         </PrivateRoute>
       }
     >
       <Route path="dashboard/my-profile" element={<MyProfile />} />
       <Route path="dashboard/Settings" element={<Settings />} />
       
 
       {
         user?.accountType === ACCOUNT_TYPE.STUDENT && (
           <>
           <Route path="dashboard/cart" element={<Cart />} />
           <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
           </>
         )
       }
 
 
     </Route>
 
     
 
     <Route path="*" element={<Error />} />
 
 
     </Routes>
 
    </div>
   );
}

export default App;
