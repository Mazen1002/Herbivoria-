import React from "react";
import "./OurResturant.css";
import Waves from "./../../../Components/Waves/Waves";

function OurResturant() {
  return (
    <React.Fragment>
      <div className="OurResturant">
        <div className="container" data-aos="zoom-in-up">
          <h1>Welcome</h1>
          <p>
            A very warm welcome to you! It is lovely to have you among us! It is
            our great pleasure to have you on resturant ! A hearty welcome to
            you! We are glad to welcome you ! Your presence is well appreciated,
            and we are delighted you are here.
          </p>
        </div>
      </div>
      <Waves styleWave="up" />
    </React.Fragment>
  );
}
export default OurResturant;
