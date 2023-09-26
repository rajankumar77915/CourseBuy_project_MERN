import React, { useState } from 'react';

export function SignupForm({ SetIsLoggedin }) {
    SetIsLoggedin(false);
    const [userType, setUserType] = useState('student');
    // const [passwordMatch, SetpasswordMatch] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password1: '',
        password2: '',
    });


    const handleUserTypeChange = (userType) => {
        setUserType(userType);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (1) {
            const formDataWithUserType = {
                ...formData,
                userType: userType,
            };
            console.log(formDataWithUserType)
        }
        else {
            console.log("password not matched")
        }
        // Add your form submission logic here
    };

    // useEffect(() => {
    //     if (formData.password1 === formData.password2) {
    //         SetpasswordMatch(true);
    //     }
    //     else {
    //         SetpasswordMatch(false);
    //     }
    //     console.log(formData.password1, formData.password2)
    // }, [formData])

    return (
        <form className="mt-6 flex w-full flex-col gap-y-4 text-richblack-5" onSubmit={handleSubmit}>
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
                        name="password1"
                        placeholder="Enter Password"
                        className="bg-richblack-700 h-12 pl-2 rounded-lg w-full"
                        value={formData.password1}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password <sup className="text-pink-200">*</sup></p>
                    <input
                        style={{ color: 'white', borderBottom: '1px white solid' }}
                        required
                        type="password"
                        name="password2"
                        placeholder="Confirm Password"
                        className="bg-richblack-700 h-12 pl-2 rounded-lg w-full"
                        value={formData.password2}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            {/* <p className={`h-0${passwordMatch && (console.log(passwordMatch)) ? "invisible" : "text-pink-200"}`}>password not mached</p> */}

            <button type="submit" className="mt-6   rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">Create Account</button>
        </form>
    )
}