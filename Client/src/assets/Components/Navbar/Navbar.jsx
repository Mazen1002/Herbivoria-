import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Handle_Logout } from "../../Toolkit/Slices/UserSlice";

function Navbar({ scrollToTop }) {
  const Dispatch = useDispatch();
  const Router = useNavigate();
  const { user } = useSelector((State) => State.User);
  const { Cart } = useSelector((State) => State.Cart);

  const [MenuMobileActive, SetMenuMobileActive] = useState(false);

  const HandleLogout = () => {
    Dispatch(Handle_Logout());
    Router("/");
  };

  return (
    <React.Fragment>
      <div className="navbar">
        <div className="container">
          {/********** Start Logo Container *************/}
          <Link className="logo" to="/" onClick={() => scrollToTop()}>
            <img src={require("../../imgs/Logo.png")} alt="logo" />
          </Link>
          {/********** End Logo Container *************/}

          {/********** Start Menu Links*************/}
          <ul className={MenuMobileActive ? "menu active" : "menu"}>
            <div
              className="exit-menu-mob"
              onClick={() => SetMenuMobileActive(!MenuMobileActive)}
            >
              <i className="fa-solid fa-xmark" />
            </div>
            <li>
              <NavLink to="" onClick={() => scrollToTop()}>
                <i className="fa-solid fa-house" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/Menu" onClick={() => scrollToTop()}>
                <i className="fa-solid fa-book-open" />
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/Contact_Us" onClick={() => scrollToTop()}>
                <i className="fa-solid fa-envelope" />
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="About_Us" onClick={() => scrollToTop()}>
                <i className="fa-solid fa-users" />
                About Us
              </NavLink>
            </li>
          </ul>
          {/********** End Menu Links*************/}
          {/********** Start User Container *************/}
          <div className="user">
            <img src={user.Avatar} alt={user.FirstName} className="Avatar" />
            <Link className="cart-item" to="Cart">
              <img src={require("../../imgs/cart.svg").default} alt="Cart" />
              <div className="count">{Cart.length}</div>
            </Link>
            <i
              className="fa-solid fa-right-from-bracket logout"
              onClick={() => HandleLogout()}
            />
            <i
              className="fa-solid fa-bars nav-mobile"
              onClick={() => SetMenuMobileActive(!MenuMobileActive)}
            />
          </div>
          {/********** End User Container *************/}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Navbar;
