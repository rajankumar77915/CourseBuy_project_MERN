import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


import { sendOtp } from "../../services/functions/sendOtp"
import { SetsignupData } from "../../slics/authSlice"
import { ACCOUNT_TYPE } from "../../utils/constants"
export function SignupForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [userType,SetuserType]=useState(ACCOUNT_TYPE.STUDENT)

    // Handle Form Submission
    const handleOnSubmit = (e) => {
        e.preventDefault()
    
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords Do Not Match")
          return
        }
        const signupData = {
          ...formData,
          userType,
        }
        console.log("sinupdata",signupData)
    
        // Setting signup data to state
        // To be used after otp verification
        dispatch(SetsignupData(signupData))
        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate))
    
        // Reset
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
        SetuserType(ACCOUNT_TYPE.STUDENT)
      }
    










   
    // const [userType, SetuserType] = useState('student');
    // const [passwordMatch, SetpasswordMatch] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });


    const handleUserTypeChange = (userType) => {
        SetuserType(userType);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (formData.password===formData.confirmPassword) {
    //         const formDataWithUserType = {
    //             ...formData,
    //             userType: userType,
    //         };
    //         dispatch( signUp(formData,navigate) );
    //         console.log(formDataWithUserType)
    //     }
    //     else {
    //         toast("password not matched");
    //     }
    //     // Add your form submission logic here
    // };

    // useEffect(() => {
    //     if (formData.password === formData.confirmPassword) {
    //         SetpasswordMatch(true);
    //     }
    //     else {
    //         SetpasswordMatch(false);
    //     }
    //     console.log(formData.password, formData.confirmPassword)
    // }, [formData])

    return (
        <form className="mt-6 flex w-full flex-col gap-y-4 text-richblack-5" onSubmit={handleOnSubmit}>
            <div className="flex bg-richblack-800 p-1  rounded-full max-w-max shadow-inset space-x-1 ">
                <div
                    name="student"
                    onClick={() => handleUserTypeChange('student')}
                    className={` ${userType === 'student' ? 'bg-richblack-900 text-richblack-5' : 'bg-transparent  text-richblack-200'}  py-2 px-5 rounded-full transition-all duration-300 cursor-pointer`}
                >
                    Student
                </div>
                <div
                    name="instructor"
                    onClick={() => handleUserTypeChange('instructor')}
                    className={` ${userType === 'instructor' ? 'bg-richblack-900 text-richblack-5' : 'bg-transparent  text-richblack-200'}  py-2 px-5 rounded-full transition-all duration-300 cursor-pointer`}
                >
                    Instructor
                </div>
            </div>
            <div className="flex gap-4">
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name <sup className="text-pink-200">*</sup></p>
                    <input
                        style={{ color: 'white', borderBottom: '1px white solid' }}
                        required
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        className="bg-richblack-700 h-12 pl-2 rounded-lg w-full"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name <sup className="text-pink-200">*</sup></p>
                    <input
                        style={{ color: 'white', borderBottom: '1px white solid' }}
                        required
                        type="text"
                        name="lastName"
                        placeholder="Enter last Name"
                        className="bg-richblack-700 h-12 pl-2 rounded-lg w-full"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email <sup className="text-pink-200">*</sup></p>
                <input
                    style={{ color: 'white', borderBottom: '1px white solid' }}
                    required
                    type="email"
                    name="email"
                    placeholder="Enter email id"
                    className="bg-richblack-700 h-12 pl-2 rounded-lg w-full"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </label>
            <div className="flex gap-4">
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Create Password <sup className="text-pink-200">*</sup></p>
                    <input
                        style={{ color: 'white', borderBottom: '1px white solid' }}
                        required
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        className="bg-richblack-700 h-12 pl-2 rounded-lg w-full"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password <sup className="text-pink-200">*</sup></p>
                    <input
                        style={{ color: 'white', borderBottom: '1px white solid' }}
                        required
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="bg-richblack-700 h-12 pl-2 rounded-lg w-full"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            {/* <p className={`h-0${passwordMatch && (console.log(passwordMatch)) ? "invisible" : "text-pink-200"}`}>password not mached</p> */}

            <button type="submit" className="mt-6   rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">Create Account</button>
        </form>
    )
}