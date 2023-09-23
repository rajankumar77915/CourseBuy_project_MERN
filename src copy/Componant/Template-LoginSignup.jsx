import patternImg from "../assets/frame.png"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"

export function Template({ title, desc1, desc2, image, formtype, SetIsLoggedin }) {
  return (
    <div className="bg-black">
      <div className="mx-auto flex w-11/12 max-w-maxContent    md:pt-14 md:flex-row ">
        <div className={`w-full flex  justify-between  md:flex md:flex-row-reverse   md:gap-x-12  ${formtype === "login" ? 'py-14' : 'py-0'}`}>

          <div className="relative mx-auto  max-w-[450px] md:mx-0">
            <img src={patternImg} alt="Pattern" width="558" height="504" />
            <img src={image} alt="Students" width="558" height="504" className="absolute -top-4 right-4 z-10" />
          </div>

          <div className="max-w-[450px] bg-purple-300-100">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">{title}</h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{desc1}</span>
              <span className="font-edu-sa font-bold italic text-blue-100">{desc2}</span>
            </p>
            {formtype === 'login' ? <LoginForm SetIsLoggedIn={SetIsLoggedin} /> : <SignupForm SetIsLoggedin={SetIsLoggedin} />}

          </div>

        </div>
      </div>
    </div>

  )
}