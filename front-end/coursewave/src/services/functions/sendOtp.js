import toast from 'react-hot-toast'
import {endpoints} from '../apis'
import { apiConnector } from '../apiconnector'
import { Setloading } from '../../slics/authSlice'

export function sendOtp(email, navigate) {
    const {SENDOTP_API}=endpoints
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(Setloading(true))
      try {
        const response = await apiConnector("POST", SENDOTP_API, {
          email,
          checkUserPresent: true,
        })
        console.log("SENDOTP API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
      }
      dispatch(Setloading(false))
      toast.dismiss(toastId)
    }
  }
  