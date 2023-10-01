import {endpoints} from '../apis'
import { Setloading} from "../../slics/authSlice"
import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector'


export function signUp(
    formData,
    navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(Setloading(true))
      try {
        const response = await apiConnector("POST", endpoints.SIGNUP_API, {
          formData
        })
  
        console.log("SIGNUP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      dispatch(Setloading(false))
      toast.dismiss(toastId)
    }
  }  