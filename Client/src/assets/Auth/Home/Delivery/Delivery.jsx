import React from "react";
import "./Delivery.css";

function Delivery() {
  return (
    <React.Fragment>
      <div className="Delivery">
        <div className="container">
          <div className="left" data-aos="fade-right">
            <img
              src={require("../../../imgs/Delivery-bicycle.png")}
              alt="bicycle"
            />
          </div>
          <div className="right">
            <div className="head">
              <p data-aos="fade-up">Delivery</p>
              <h1 data-aos="fade-up">Fastest Delivery</h1>
              <span data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                voluptate officia fuga maxime, reiciendis dolore autem esse rem
                at deserunt tempore, totam, sequi explicabo consequatur voluptas
                cupiditate iure. Neque, voluptatem?
              </span>
            </div>
            <div className="content">
              <div className="box" data-aos="zoom-in-up">
                <i className="fa-solid fa-truck" />
                <span> Fast Delivery in 30 minutes</span>
              </div>
              <div className="box" data-aos="zoom-in-up">
                <i className="fa-solid fa-people-group" />
                <span>100+ workers</span>
              </div>
              <div className="box" data-aos="zoom-in-up">
                <i className="fa-solid fa-utensils" />
                <span>50+ Restaurants</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Delivery;
