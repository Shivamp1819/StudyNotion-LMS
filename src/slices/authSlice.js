import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: sessionStorage.getItem("signupData")
    ? JSON.parse(sessionStorage.getItem("signupData"))
    : null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
      if (value.payload) {
        sessionStorage.setItem("signupData", JSON.stringify(value.payload));
      } else {
        sessionStorage.removeItem("signupData");
      }
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
