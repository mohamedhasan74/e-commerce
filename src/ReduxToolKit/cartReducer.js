import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApi } from "../App.js";
import { toast } from "react-toastify";

export const updateProductQuantity = createAsyncThunk(
  "cart/updateProductQuantity",
  async ({ token, count, productId }) => {
    try {
      const response = await axios.put(
        `${baseApi}api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers: { token },
        }
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async ({ token, productId }) => {
    try {
      const response = await axios.post(
        `${baseApi}api/v1/cart`,
        {
          productId,
        },
        {
          headers: { token },
        }
      );
      return response.data.status;
    } catch (error) {
      return false;
    }
  }
);
export const removePrpduct = createAsyncThunk(
  "cart/removeProduct",
  async ({ token, productId }) => {
    try {
      const response = await axios.delete(
        `${baseApi}api/v1/cart/${productId}`,
        {
          headers: { token },
        }
      );
      return response.data;
    } catch (error) {
      return false;
    }
  }
);
export const clearPrpducts = createAsyncThunk(
  "cart/clearProducts",
  async (token) => {
    try {
      const response = await axios.delete(`${baseApi}api/v1/cart`, {
        headers: { token },
      });
      return response.data.message;
    } catch (error) {
      return false;
    }
  }
);
export const getProducts = createAsyncThunk(
  "cart/getProducts",
  async (token) => {
    try {
      const response = await axios.get(`${baseApi}api/v1/cart`, {
        headers: { token },
      });
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
const initialState = {
  status: false,
  numOfCartItems: 0,
  totalCartPrice: 0,
  products: [],
  cartId: null,
  error: "",
};
const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.status = action.payload;
      if (action.payload === "success") {
        toast.success("Product Added To Cart", {
          position: "bottom-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        state.status = false;
        toast.error("Product Doesn't Added To Cart", {
          position: "bottom-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        state.cartId = action.payload.data._id;
        state.status = action.payload.status;
        state.products = action.payload.data?.products;
        state.totalCartPrice = action.payload.data?.totalCartPrice;
        state.numOfCartItems = action.payload.numOfCartItems;
      } else {
        state.error = action.payload;
      }
    });
    builder.addCase(removePrpduct.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        state.status = action.payload.status;
        state.products = action.payload.data?.products;
        state.totalCartPrice = action.payload.data?.totalCartPrice;
        state.numOfCartItems = action.payload.numOfCartItems;
        toast.success("Product Removed", {
          position: "bottom-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        state.error = action.payload;
        toast.error("Product Doesn't Remove", {
          position: "bottom-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
    builder.addCase(clearPrpducts.fulfilled, (state, action) => {
      if (action.payload === "success") {
        state.products = [];
        state.numOfCartItems = 0;
        state.totalCartPrice = 0;
        toast.success("All Products Is Removed", {
          position: "bottom-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("All Products Doesn't Removed", {
          position: "bottom-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
    builder.addCase(updateProductQuantity.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        state.status = action.payload.status;
        state.products = action.payload.data?.products;
        state.totalCartPrice = action.payload.data?.totalCartPrice;
        state.numOfCartItems = action.payload.numOfCartItems;
      } else {
        toast.error("Check Your Connection", {
          position: "bottom-right",
          autoClose: 250,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  },
});

export default cartReducer.reducer;
