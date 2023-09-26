import { Link } from "react-router-dom";

function Button({children,active,linkto}){
    return(
        <Link to={linkto}>
        <div className={`text-center text-[13px] px-6 py-3 cursor-pointer transition-all duration-300 hover:scale-95 rounded-md font-bold w-fit ${active?"bg-yellow-50 text-black":"bg-richblack-800 text-white"} `}>{children}</div>
        </Link>
    );
} 
export default Button;
