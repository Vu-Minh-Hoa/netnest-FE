import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  token: '',
  isLoading: false,
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setUserDetail(state, action) {
      state.user = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setToken, setUserDetail, setIsLoading } = userSlice.actions;
export default userSlice.reducer;
