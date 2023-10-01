import { useState } from "react";

import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
import {login} from '../../services/functions/login'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [showPassword, SetshowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("login service calling")
        dispatch(login(formData.email,formData.password,navigate))
        // Add your form submission logic here
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 flex w-full flex-col gap-y-4">
            <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className="text-pink-200">*</sup></p>
                <input value={formData.email} onChange={handleInputChange} style={{ color: 'white', borderBottom: '1px white solid' }} required type="text" name="email" placeholder="Enter email address" className="bg-richblack-700 h-12 pl-2 rounded-lg w-full" />
            </label>
            <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Password <sup className="text-pink-200">*</sup></p>
                <input value={formData.password} onChange={handleInputChange} style={{ color: 'white', borderBottom: '1px white solid' }} required type={showPassword ? "text" : "password"} name="password" placeholder="Enter password" className="bg-richblack-700 h-12 pl-2    rounded-lg w-full" />

                <span onClick={() => { SetshowPassword((prev) => !prev) }} className="absolute right-3 top-[38px] z-[10] cursor-pointer text-2xl">
                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
                <a href="/forgot-password">
                    <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">Forgot Password</p>
                </a>
            </label>
            <button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">Sign In</button>
        </form>
    );
}