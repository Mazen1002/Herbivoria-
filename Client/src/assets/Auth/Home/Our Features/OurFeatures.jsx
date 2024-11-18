import React from "react";
import "./OurFeatures.css";

function OurFeatures() {
  return (
    <React.Fragment>
      <div className="OurFeatures">
        <div className="container" data-aos="fade-up">
          <p>Our Features</p>
          <h1>Why people Choose us ?</h1>
          <div className="OurFeatures-container">
            <div className="box active">
              <i className="fa-solid fa-award" />
              <h5>Best in the town</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatum necessitatibus accusamus itaque facilis illo maxime.
              </p>
            </div>
            <div className="box">
              <i className="fa-solid fa-truck" />
              <h5>Faster Delivery </h5>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatum necessitatibus accusamus itaque facilis illo maxime.
              </p>
            </div>
            <div className="box">
              <i className="fa-solid fa-mobile" />
              <h5>Easy to order</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatum necessitatibus accusamus itaque facilis illo maxime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default OurFeatures;
