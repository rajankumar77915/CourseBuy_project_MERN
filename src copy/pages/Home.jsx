import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"
import { HighLightText } from "../Componant/HomePage/HighLightText";
import CTAButton from "../Componant/HomePage/Button"
function Home() {
  return (
    <div className="text-blue-5 mt-16">
      {/* section1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white  max-w-maxContent">
        <Link to={"/signup"}>
          <div className="group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] ">
            <div className="flex flex-row gap-2 rounded-full px-10 py-[5px] items-cente group-hover:bg-black  shadow-white">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold  mt-4">
          <span>Empower Your Future with</span>
          <HighLightText text={"coding Skills"} />
        </div>
        <div className="w-[90%] text-center text-lg font-bold text-richblack-300 mt-4">
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>
        <div className="flex flex-row gap-7 pt-14">
          <CTAButton active={true} linkto={"/login"}>Learn More</CTAButton>
          <CTAButton active={false} linkto={"/signup"}>Learn More</CTAButton>
      </div>
        </div>
      {/* section2 */}
      {/* section3 */}
      {/* section4 */}
    </div>
  );
}

export default Home;
