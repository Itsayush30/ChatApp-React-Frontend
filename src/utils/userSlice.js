import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jwt: null,
  userName: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.jwt = action.payload.jwt;
      state.userName = action.payload.userName;
    },
    clearUser: (state) => {
      state.jwt = null;
      state.userName = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
