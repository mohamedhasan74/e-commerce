import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = {
  userToken: null,
  userId: null,
};

export const tokenReducer = createSlice({
  name: "userToken",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      localStorage.setItem("userToken", action.payload);
      state.userToken = action.payload;
      state.userId = jwtDecode(action.payload).id;
    },
    removeToken: (state) => {
      localStorage.removeItem("userToken");
      state.userToken = null;
    },
  },
});

export const { saveToken, removeToken } = tokenReducer.actions;

export default tokenReducer.reducer;
