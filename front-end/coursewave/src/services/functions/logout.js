import toast from "react-hot-toast"
import {Settoken } from "../../slics/authSlice"
import {resetCart} from "../../slics/cartSlice"
  export function logout(navigate) {
    return (dispatch) => {
      dispatch(Settoken(null))
      dispatch(Settoken(null))
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }