import React, { useEffect } from "react";
import Auth from "./assets/Auth/Auth.jsx";
import Guest from "./assets/Guest/Guest.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  Login_Local,
  Login_Local_Thunk,
} from "./assets/Toolkit/Slices/UserSlice.js";
import { GetCartProducts } from "./assets/Toolkit/Slices/CartSlice.js";

function App() {
  const IsLogin = useSelector((state) => state.User.IsLogin);
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(Login_Local());
    if (IsLogin) {
      Dispatch(Login_Local_Thunk());
      Dispatch(GetCartProducts());
    }
  }, [IsLogin]);

  return IsLogin ? <Auth /> : <Guest />;
}

export default App;
