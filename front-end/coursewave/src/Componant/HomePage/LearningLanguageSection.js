import React from 'react'
import { HighLightText } from './HighLightText'
import CTAButton from './Button'
export const LearningLanguageSection = () => {
  return (
    <div className='relative mx-auto flex flex-col w-11/12 items-center text-richblue-900  max-w-maxContent mt-[105px]'>
        <div className="text-center text-4xl font-semibold  mt-4">
          <span>Your swiss knife for</span>
          <HighLightText text={"coding Skills"} />
        </div>
        <div className="w-[90%] text-center text-lg font-bold text-richblack-300 mt-4">
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className="flex flex-row gap-7 py-14">
          <CTAButton active={true} linkto={"/login"}>Learn More</CTAButton>
        </div>
    </div>
  )
}
