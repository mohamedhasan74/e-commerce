import "./App.css";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Products from "./Components/Products/Products.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";
import VerifResetCode from "./Components/VerifyResetCode/VerifyResetCode.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import { Provider } from "react-redux";
import { store } from "./ReduxToolKit/store.js";
import ProdectedRoute from "./Components/ProdectedRoute/ProdectedRoute.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import Orders from "./Components/Orders/Orders.jsx";
import CheckOut from "./Components/CheckOut/CheckOut.jsx";
export const baseApi = "https://route-ecommerce.onrender.com/";
const routes = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cart",
        element: (
          <ProdectedRoute>
            <Cart />
          </ProdectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProdectedRoute>
            <Orders />
          </ProdectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProdectedRoute>
            <CheckOut />
          </ProdectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProdectedRoute>
            <Products />
          </ProdectedRoute>
        ),
      },
      {
        path: "products/:id",
        element: (
          <ProdectedRoute>
            <ProductDetails />
          </ProdectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProdectedRoute>
            <Brands />
          </ProdectedRoute>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgetpassword",
        element: <ForgetPassword />,
      },
      {
        path: "verifyresetcode",
        element: <VerifResetCode />,
      },
      {
        path: "resetpassword",
        element: <ResetPassword />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routes}></RouterProvider>
      </Provider>
    </>
  );
}

export default App;
