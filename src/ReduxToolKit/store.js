import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenReducer.js";
import cartReducer from "./cartReducer.js";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    cart: cartReducer,
  },
});
