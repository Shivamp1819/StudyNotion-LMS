import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const cleanEmail = email.trim().toLowerCase()
    const toastId = toast.loading("Sending verification code to your email...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email: cleanEmail,
        checkUserPresent: true,
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.dismiss(toastId)
      dispatch(setLoading(false))
      toast.success("OTP Sent! Please check your email.")
      if (navigate) {
        navigate("/verify-email")
      }
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      const message = error.response?.data?.message || error.message || "Could Not Send OTP"
      toast.dismiss(toastId)
      dispatch(setLoading(false))
      toast.error(message)
    }
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Creating account...")
    dispatch(setLoading(true))
    try {
      const cleanEmail = email.trim().toLowerCase()
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email: cleanEmail,
        password,
        confirmPassword,
        otp: otp.toString().trim(),
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
      sessionStorage.removeItem("signupData")
      toast.success("Signup Successful! Please sign in.")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      const message = error.response?.data?.message || error.message || "Signup Failed"
      toast.dismiss(toastId)
      dispatch(setLoading(false))
      toast.error(message)
    }
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing in...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      const userData = { ...response.data.user, image: userImage }

      dispatch(setToken(response.data.token))
      dispatch(setUser(userData))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(userData))

      toast.dismiss(toastId)
      dispatch(setLoading(false))
      toast.success("Login Successful")
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      const message = error.response?.data?.message || error.message || "Login Failed"
      toast.dismiss(toastId)
      dispatch(setLoading(false))
      toast.error(message)
    }
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
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
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed To Send Reset Email"
      toast.error(errorMsg)
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating password...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.dismiss(toastId)
      dispatch(setLoading(false))
      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed To Reset Password"
      toast.dismiss(toastId)
      dispatch(setLoading(false))
      toast.error(errorMsg)
    }
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}
