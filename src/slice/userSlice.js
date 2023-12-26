import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    getUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setToken, getUser } = userSlice.actions;
export default userSlice.reducer;
