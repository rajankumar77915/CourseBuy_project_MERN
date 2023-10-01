import signupImg from "../assets/signup.png";
import { Template } from '../Componant/Auth/Template-LoginSignup';

function Signup() {
  return (


    <Template
      title="Join CourseWave Free For Study"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={signupImg}
      formType="login"
    />
    // <div className="bg-black">
    //   <div className="mx-auto flex w-11/12 max-w-maxContent md:pt-14 md:flex-row">
    //     <div className="w-full flex justify-between md:flex md:flex-row-reverse md:gap-x-12 ">
    //       <div className="relative mx-auto max-w-[450px] md:mx-0">
    //         <img src={patternImg} alt="Pattern" width="558" height="504" />
    //         <img src={signupImg} alt="Students" width="558" height="504" className="absolute -top-4 right-4 z-10" />
    //       </div>
    //       <div className="max-w-[450px] bg-purple-300-100">
    //         <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5"></h1>
    //         <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
    //           <span className="text-richblack-100">Build skills for today, tomorrow, and beyond.</span>
    //           <span className="font-edu-sa font-bold italic text-blue-100">Education to future-proof career.</span>
    //         </p>
            // <div className="flex bg-richblack-800 p-1 my-6 rounded-full max-w-max shadow-inset space-x-1 ">
            //   <button
            //     name="student"
            //     onClick={() => handleUserTypeChange('student')}
            //     className={` ${userType === 'student' ? 'bg-richblack-900 text-richblack-5' : 'bg-transparent  text-richblack-200'}  py-2 px-5 rounded-full transition-all duration-200`}
            //   >
            //     Student
            //   </button>
            //   <button
            //     name="instructor"
            //     onClick={() => handleUserTypeChange('instructor')}
            //     className={` ${userType === 'instructor' ? 'bg-richblack-900 text-richblack-5' : 'bg-transparent  text-richblack-200'}  py-2 px-5 rounded-full transition-all duration-200`}
            //   >
            //     Instructor
            //   </button>
            // </div>
               
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Signup;