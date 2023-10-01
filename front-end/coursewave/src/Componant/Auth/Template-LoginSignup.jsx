import { useSelector } from "react-redux"
import patternImg from "../../assets/Images/frame.png"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"

export function Template({ title, desc1, desc2, image, formtype }) {
  const { loading } = useSelector((state) => state.auth)
  return (
    <div className="mx-auto flex w-11/12 max-w-maxContent    md:pt-14 md:flex-row ">
    {loading?(
      <div className="spinner"></div>
    ):(
        <div className={`w-full  flex flex-col justify-center items-center md:justify-between  md:flex md:flex-row-reverse   md:gap-x-12  ${formtype === "login" ? 'py-14' : 'py-0'}`}>

          <div className={`relative mx-auto ml-1 md:ml-0 max-w-[450px] ${formtype === 'login'?"mt-0 ":"md:mt-0 md:mb-12 mt-14"}  md:mx-0`}>
            <img src={patternImg} alt="Pattern" width="558" height="504" />
            <img src={image} alt="Students" width="558" height="504" className="absolute top-4 right-3 z-10" />
          </div>

          <div className="md:mt-0 mt-14 max-w-[450px] bg-purple-300-100">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">{title}</h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{desc1}</span>
              <span className="font-edu-sa font-bold italic text-blue-100">{desc2}</span>
            </p>
            {formtype === 'login' ? <LoginForm/> : <SignupForm/>}

          </div>

        </div>
        )
      }
      </div>

  )
}