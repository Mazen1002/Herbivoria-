import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import Waves from "../../../Components/Waves/Waves";

function Landing() {
  return (
    <React.Fragment>
      <div className="landing">
        <div className="container" data-aos="zoom-in-up">
          <div className="left">
            <h1>
              Herbivoria
              <p>For Fast Foods</p>
            </h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typeset ting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever
            </p>
            <div className="actions">
              <Link className="btn active" to="/Menu">
                View Menu
              </Link>
              <a className="btn" href="#reservation">
                Book a Table
              </a>
            </div>
          </div>
          <div className="right">
            <img src={require("../../../imgs/Burger_Image.png")} alt="" />
          </div>
        </div>
      </div>
      <Waves styleWave="up" />
    </React.Fragment>
  );
}
export default Landing;
