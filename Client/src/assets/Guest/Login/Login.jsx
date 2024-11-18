import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Handle_RemmberMe, Login_Thunk } from "../../Toolkit/Slices/UserSlice";

function Login() {
  const { RememberMe, Errors, loading } = useSelector((State) => State.User);
  const [User, SetUser] = useState({
    email: "",
    password: "",
  });

  const Dispatch = useDispatch();

  const HandleLogin = () => {
    Dispatch(Login_Thunk(User));
  };
  return (
    <React.Fragment>
      <div className="login">
        <div className="container">
          <div className="loginCard">
            <div className="left" data-aos="zoom-in">
              <div className="content">
                <img src={require("../../imgs/Herbivoria.png")} alt="logo" />
                <h5>Let's make your Order</h5>
                <p>
                  Welcome Back, Sign in with your email address and password
                </p>
              </div>
              <div className="content">
                <div className="input-card">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your Email"
                    value={User.email}
                    onChange={(e) =>
                      SetUser({ ...User, email: e.target.value })
                    }
                  />
                  <p className="Error">{Errors["email"]}</p>
                </div>
                <div className="input-card">
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={User.password}
                    onChange={(e) =>
                      SetUser({ ...User, password: e.target.value })
                    }
                  />
                  <p className="Error">{Errors["password"]}</p>
                </div>
                <div className="input-remember">
                  <div className="input-check">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={RememberMe}
                      onChange={() => Dispatch(Handle_RemmberMe())}
                    />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <Link to="">Forget password ?</Link>
                </div>
                <div className="input-card">
                  <button onClick={() => HandleLogin()} disabled={loading}>
                    {loading ? "Loading..." : "Sign In"}
                  </button>
                </div>
                <div className="content">
                  <p>
                    Don't Have an account ? <Link to="register">Sign up </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="right">
              <img src={require("../../imgs/resturant.jpg")} alt="login" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Login;
