import toast from "react-hot-toast"
import { endpoints } from "../apis"
import { apiConnector } from "../apiconnector"
import { Setloading, Settoken } from "../../slics/authSlice"
export function login(email, password, navigate) {
    const {
        LOGIN_API,
    } = endpoints
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(Setloading(true))
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            })

            console.log("LOGIN API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successful")
            dispatch(Settoken(response.data.token))
            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({ ...response.data.user, image: userImage }))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            navigate("/dashboard/my-profile")
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(Setloading(false))
        toast.dismiss(toastId)
    }
}
