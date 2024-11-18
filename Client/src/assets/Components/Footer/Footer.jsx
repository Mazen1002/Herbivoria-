import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Waves from "../Waves/Waves";

function Footer() {
  return (
    <React.Fragment>
      <Waves styleWave="bottom" />
      <div className="footer">
        <div className="container">
          <div className="box">
            <div className="head">
              <img src={require("../../imgs/Logo.png")} alt="logo" />
            </div>
            <div className="content-box">
              <a href="tel:+20 1111111111" className="contact">
                <i className="fa-solid fa-phone" />
                <span>+20 1111111111</span>
              </a>
              <div className="contact">
                <i className="fa-solid fa-location-dot" />
                <span>82 St Sphinx street</span>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="head">Categories</div>
            <div className="content-box">
              <Link>Starters</Link>
              <Link>Salads</Link>
              <Link>combos</Link>
              <Link>Burgers</Link>
              <Link>Pizza</Link>
              <Link>Drinks</Link>
            </div>
          </div>
          <div className="box">
            <div className="head">Useful Links</div>
            <div className="content-box">
              <Link>Payment & Tax</Link>
              <Link>Teams of service</Link>
              <Link>My account</Link>
              <Link>Return Policy</Link>
              <Link>Discount</Link>
            </div>
          </div>
          <div className="box">
            <div className="head">News Letter</div>
            <div className="content-box">
              <p>
                Get now Free 20% dicount for all Proudacts on your first order .
              </p>
              <div className="email-content-box">
                <input type="email" placeholder="Your email here ..." />
                <button>
                  <i className="fa-solid fa-paper-plane" />
                </button>
              </div>
              <div className="social">
                <i className="fa-brands fa-facebook-f" />
                <i className="fa-brands fa-twitter" />
                <i className="fa-brands fa-youtube" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Footer;
