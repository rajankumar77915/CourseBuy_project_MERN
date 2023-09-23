import iconImg from '../assets/icon.png'
import { NavLink } from 'react-router-dom'
function NavBar(props) {
  const isLoggedin = props.isLoggedin;
  // const SetIsLoggedIn = props.IsLoggedin;
  const screenWidth = window.innerWidth;
  // SetIsLoggedIn(false);
  return (
    <div className='flex justify-center bg-richblack-900 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
      <div className=' w-11/12 flex justify-between  h-14 text-richblack-25 bg-richblack-900 font-mono sm:text-lg  '>
        <NavLink to="/" className='flex  bg-richblack-900 items-center'><img src={iconImg} alt="icon" className='h-9 bg-richblack-900' />
          {screenWidth >= 650 ? 'CourseWave' : null}
        </NavLink>
        <div className='flex items-center  gap-4   bg-richblack-900'>
          <div><NavLink to="/">Home</NavLink></div>
          <div><NavLink to="#">About</NavLink></div>
          <div><NavLink to="#">Contact US</NavLink></div>
        </div>
        <div className='flex items-center justify-start  gap-4 md:text-lg   bg-richblack-900'>
          {!isLoggedin && <div><NavLink to="/login">Login</NavLink></div>}
          {!isLoggedin && <div><NavLink to="/signup">Singnup</NavLink></div>}
          {isLoggedin && <div><NavLink to="/login">Logout</NavLink></div>}
          {isLoggedin && <div><NavLink to="/dashBord">Dashbord</NavLink></div>}
        </div>
      </div>
    </div>
  );
}
export default NavBar;