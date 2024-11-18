import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { HandleRegister } from "../../Toolkit/Slices/RegisterSlice";

function Register() {
  const Dispatch = useDispatch();
  const { errors, loading } = useSelector((State) => State.Register);
  const Navigate = useNavigate();

  const [RegisterData, SetRegisterData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Gender: "",
  });
  const [Phone, SetPhone] = useState("");

  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    SetRegisterData({ ...RegisterData, [name]: value });
  };

  return (
    <React.Fragment>
      <div className="Register">
        <div className="container">
          <div className="RegisterCard">
            <div className="left" data-aos="zoom-in">
              <div className="content">
                <img src={require("../../imgs/Herbivoria.png")} alt="logo" />
                <h5>Let's make your Account</h5>
                <p>Welcome To Herbivoria, Register Now - Order now</p>
              </div>
              <div className="content">
                <div className="Flex-card">
                  <div className="input-card">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="FirstName"
                      value={RegisterData.FirstName}
                      onChange={(e) => HandleChangeInput(e)}
                    />
                    <p className="Error">{errors["FirstName"]}</p>
                  </div>
                  <div className="input-card">
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="LastName"
                      value={RegisterData.LastName}
                      onChange={(e) => HandleChangeInput(e)}
                    />
                    <p className="Error">{errors["LastName"]}</p>
                  </div>
                </div>
                <div className="input-card">
                  <PhoneInput
                    country="EG"
                    value={Phone}
                    onChange={SetPhone}
                    placeholder="+20"
                    specialLabel={false}
                  />
                  <p className="Error">{errors["Mobile"]}</p>
                </div>
                <div className="input-card">
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    name="Email"
                    value={RegisterData.Email}
                    onChange={(e) => HandleChangeInput(e)}
                  />
                  <p className="Error">{errors["email"]}</p>
                </div>
                <div className="input-card">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    name="Password"
                    value={RegisterData.Password}
                    onChange={(e) => HandleChangeInput(e)}
                  />
                  <p className="Error">{errors["password"]}</p>
                </div>
                <div className="content-gender">
                  <div className="input-check">
                    <input
                      type="radio"
                      id="male"
                      name="Gender"
                      value="Male"
                      onChange={(e) => HandleChangeInput(e)}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div className="input-check">
                    <input
                      type="radio"
                      id="female"
                      name="Gender"
                      value="Female"
                      onChange={(e) => HandleChangeInput(e)}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  <p className="Error">{errors["Gender"]}</p>
                </div>
                <div className="input-card">
                  <button
                    onClick={() =>
                      Dispatch(
                        HandleRegister({ ...RegisterData, Mobile: Phone })
                      ).then((res) => {
                        if (res.payload.Status !== "Faild") {
                          Navigate("/");
                        }
                      })
                    }
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Register"}
                  </button>
                </div>
                <div className="content">
                  <p>
                    Already Have an account ? <Link to="/">Sign in </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="right">
              <img src={require("../../imgs/resturant.jpg")} alt="Register" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Register;
