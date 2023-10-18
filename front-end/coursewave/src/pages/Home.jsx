import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { HighLightText } from "../Componant/HomePage/HighLightText";
import CTAButton from "../Componant/HomePage/Button";
import Videobanner from "../assets/banner.mp4";
import CodeBlocks from "../Componant/HomePage/CodeBlocks";
import TimeLineSection from "../Componant/HomePage/TimeLineSection";
import { LearningLanguageSection } from "../Componant/HomePage/LearningLanguageSection";
import instructorImg from '../assets/Images/Instructor.png';
import ExploreMore from '../Componant/HomePage/ExploreMore';

function Home() {
  return (
    <div className="text-blue-5  mt-16 bg-richblack-900">

      {/* section1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white  max-w-maxContent">
            
            <Link to={"/signup"}>
              <div className="group mx-auto rounded-full bg-richblack-900 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] ">
                <div className="flex flex-row gap-2 rounded-full px-10 py-[5px] items-center group-hover:bg-black  shadow-white">
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

            <div className="flex flex-row gap-7 py-14">
              <CTAButton active={true} linkto={"/login"}>Learn More</CTAButton>
              <CTAButton active={false} linkto={"/signup"}>Learn More</CTAButton>
            </div>

            {/* start video */}
            <div className="shadow-blue-200 shadow-[0px_0px_30px_0px]  mx-3">
              <video className="" muted loop autoPlay src={Videobanner}></video>
            </div>
        {/* end video */}

        {/* start coding section */}
        {/* Code Section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-semibold'>
                Unlock Your
                <HighLightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={
              {
                btnText: "try it yourself",
                linkto: "/signup",
                active: true,
              }
            }
            ctabtn2={
              {
                btnText: "learn more",
                linkto: "/login",
                active: false,
              }
            }

            codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Study with CourseWave</title><link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1 class="heding">Welcome to Coursewave </h1>\n</body>\n</html>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className='text-4xl font-semibold'>
                Unlock Your
                <HighLightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={
              {
                btnText: "try it yourself",
                linkto: "/signup",
                active: true,
              }
            }
            ctabtn2={
              {
                btnText: "learn more",
                linkto: "/login",
                active: false,
              }
            }

            codeblock={`Ashish Ashish mahan coder !!`}
            codeColor={"text-yellow-25"}
          />
        </div>
        <ExploreMore />
      </div>


      {/* section2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        {/* start two buttons */}
        <div className="bg:section2Homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col justify-between items-center  gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex justify-center   gap-7  w-full">
              <CTAButton active={true} linkto={"/login"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn more
              </CTAButton>
            </div>
          </div>
        </div>
        {/* end two buttons */}


        {/*  skills, timeline, learningLanguage */}
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between  gap-7">
          {/*heading and subheading + button */}
          <div className="flex lg:flex-row flex-col items-start justify-around gap-5 mb-10 ">
                <div className="text-center text-4xl font-semibold  mt-4 w-full lg:w-[45%]">
                  <span>Get the skills you need for a <HighLightText text="job that is in demand." /></span>
                </div>
                
                <div className="w-[90%] text-center text-lg font-bold text-richblack-300 mt-4 lg:w-[40%]">
                      <div className="text-[16px]  text-justify">
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                      </div>

                      <div className="my-8 flex justify-center  lg:justify-start">
                        <CTAButton active={true} linkto={"/login"}>Learn More</CTAButton>
                      </div>
                </div>

          </div>
        </div>


          {/* start heading and subheading + button */}
        <TimeLineSection />
        <LearningLanguageSection />
        {/* end heading and subheading + button */}


      </div>
      {/* section3 */}
      <div className="lg:flex-row  mx-auto  mt-9 min-h-full flex w-11/12 max-w-maxContent flex-col items-center justify-between lg:gap-8 bg-richblack-900  text-white">
            
            <div className="lg:w-[50%] w-[70%]">
              <img className="shadow-white shadow-[10px_20px_20px_5px] " src={instructorImg} alt="teacher" />
            </div>

            <div className='w-[50%]  mx-auto flex flex-col  items-center text-richblue-900  max-w-maxContent  pt-12 mb-12'>
              <div className="text-center text-4xl font-semibold  mt-4 text-richblack-5">
                <p>Become an </p>
                <HighLightText text={"instructor"} />
              </div>
              <div className="flex flex-row gap-7 py-14">
                <CTAButton active={true} linkto={"/login"}>Learn More</CTAButton>
              </div>
            </div>

      </div>
      
      <div className="text-center text-4xl font-semibold  mt-14  text-richblack-5">
        <p>Reviews from other learners</p>
        <HighLightText text={"instructor"} />
      </div>

      <div className="h-[150px]"></div>
    </div>
  );
}

export default Home;
