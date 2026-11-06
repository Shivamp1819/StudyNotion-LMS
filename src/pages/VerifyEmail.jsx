import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { setSignupData } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // If state in memory was lost due to refresh, try restoring from sessionStorage
    if (!signupData) {
      const stored = sessionStorage.getItem("signupData");
      if (stored) {
        try {
          dispatch(setSignupData(JSON.parse(stored)));
          return;
        } catch (e) {
          console.error("Failed to restore signupData:", e);
        }
      }
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupData]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    if (!signupData) {
      navigate("/signup");
      return;
    }
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  const emailDisplay = signupData?.email || "your email";

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] grid place-items-center">
      <div className={`max-w-[500px] p-4 lg:p-8 transition-opacity duration-300 ${loading ? "opacity-60 pointer-events-none" : "opacity-100"}`}>
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          Verify Email
        </h1>
        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
          A 6-digit verification code has been sent to{" "}
          <span className="font-semibold text-yellow-50">{emailDisplay}</span>.
          Enter the code below to complete your registration.
        </p>
        <form onSubmit={handleVerifyAndSignup}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50 text-xl font-bold"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
            }}
          />
          <button
            type="submit"
            disabled={loading || otp.length < 6}
            className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-semibold text-richblack-900 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-yellow-500/10"
          >
            {loading ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-richblack-900 border-t-transparent"></span>
                <span>Verifying Account...</span>
              </>
            ) : (
              "Verify & Complete Registration"
            )}
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <Link to="/signup">
            <p className="text-richblack-5 flex items-center gap-x-2 transition-colors hover:text-yellow-50">
              <BiArrowBack /> Back To Signup
            </p>
          </Link>
          <button
            disabled={loading}
            className="flex items-center text-blue-100 gap-x-2 transition-colors hover:text-blue-50 disabled:opacity-50"
            onClick={() => {
              if (signupData?.email) {
                dispatch(sendOtp(signupData.email, navigate));
              }
            }}
          >
            <RxCountdownTimer />
            {loading ? "Sending..." : "Resend OTP"}
          </button>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-richblack-900/50 backdrop-blur-sm">
          <div className="spinner"></div>
          <p className="mt-4 text-base font-medium text-yellow-50 animate-pulse">
            Verifying your code...
          </p>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
