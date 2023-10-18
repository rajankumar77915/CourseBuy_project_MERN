import toast from "react-hot-toast"
import { endpoints } from "../apis"
import { apiConnector } from "../apiconnector"
import { Setloading } from "../../slics/authSlice"
export function getPasswordResetToken(email, setEmailSent) {
    const {
        RESETPASSTOKEN_API
    } = endpoints
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(Setloading(true))
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email,
            })

            console.log("RESETPASSTOKEN RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Sent")
            setEmailSent(true)
        } catch (error) {
            console.log("RESETPASSTOKEN ERROR............", error)
            toast.error("Failed To Send Reset Email")
        }
        toast.dismiss(toastId)
        dispatch(Setloading(false))
    }
}

export function resetPassword(password, confirmPassword, token, navigate) {
    const {
        RESETPASSWORD_API
    } = endpoints
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(Setloading(true))
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token,
            })

            console.log("RESETPASSWORD RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Password Reset Successfully")
            navigate("/login")
        } catch (error) {
            console.log("RESETPASSWORD ERROR............", error)
            toast.error("Failed To Reset Password")
        }
        toast.dismiss(toastId)
        dispatch(Setloading(false))
    }
}
