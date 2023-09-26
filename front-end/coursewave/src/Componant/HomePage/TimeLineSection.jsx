import Logo1 from '../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../assets/TimeLineLogo/Logo4.svg'
import TimeLineImg from '../../assets/Images/TimelineImage.png'
const timeline = [
  {
    Logo: Logo1,
    heading: "Leardership",
    Describtion: "Fully committed to the success company"
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Describtion: "Students will always be our top priority"
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Describtion: "The ability to switch is an important skills"
  },
  {
    Logo: Logo4,
    heading: "slove problem",
    Describtion: "code your way to a soluction"
  }
]

const TimeLineSection = () => {
  
  return (
    

      <div className='flex lg:flex-row flex-col items-center gap-15 lg:justify-center'>
        {/*start left side */}
        <div className='w-[45%] flex flex-col'>
          {timeline.map((element, index) => {
            return (
              <div className='flex flex-row gap-5 mb-16' key={index}>
                <div className={`w-[50px] h-[50px] rounded-full  flex justify-center items-center`}><img height={20} width={20} src={`${element.Logo}`} alt="logo" /></div>
                <div className='flex flex-col'>
                  <div className='text-lg  font-semibold'> {element.heading}</div>
                  <div className='text-base'>{element.Describtion}</div>
                </div>
              </div>
            );
          })}
        </div>
        {/*end left side */}
        {/* start right side */}
        <div>
          <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
                <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10">
                      <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
                        <h1 className="text-3xl font-bold w-[75px]">10</h1>
                        <h1 className="text-caribbeangreen-300 text-sm w-[75px]">Years experiences</h1>
                      </div>
                      <div className="flex gap-5 items-center lg:px-14 px-7">
                        <h1 className="text-3xl font-bold w-[75px]">250</h1>
                        <h1 className="text-caribbeangreen-300 text-sm w-[75px]">types of courses</h1>
                      </div>
                  <div></div>
                </div>
                <img src={TimeLineImg} alt="timelineImage" className="shadow-white max-w-[400px] md:max-w-[550px] lg:max-w-[623.33px]  shadow-[20px_20px_0px_0px] object-cover  lg:h-fit" />
          </div>
        </div>
        {/* end right  side */}
      </div>
    
  )
}

export default TimeLineSection