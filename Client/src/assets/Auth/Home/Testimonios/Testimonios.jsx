import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import "./Testimonios.css";

function Testimonios() {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <React.Fragment>
      <div className="Testimonios">
        <div className="container">
          <div className="head" data-aos="fade-up">
            <p>Testimonios</p>
            <h1>People Said About Us</h1>
          </div>
          <AutoplaySlider
            play={true}
            cancelOnInteraction={false}
            interval={6000}
            className="aws-btn"
          >
            <div className="box" data-aos="zoom-in">
              <img
                src={require("../../../imgs/Testimonios/Client1.jpeg")}
                alt="Brandi J. Mims"
              />
              <h5>Brandi J. Mims</h5>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatem dignissimos corrupti earum iusto tempore inventore
                necessitatibus velit, perspiciatis aliquam quisquam, optio
                blanditiis neque rem natus dolorum vitae reiciendis ipsum cum?
              </p>
            </div>
            <div className="box" data-aos="zoom-in-up">
              <img
                src={require("../../../imgs/Testimonios/Client2.jpeg")}
                alt="Paula J. Bouchard"
              />
              <h5>Paula J. Bouchard</h5>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatem dignissimos corrupti earum iusto tempore inventore
                necessitatibus velit, perspiciatis aliquam quisquam, optio
                blanditiis neque rem natus dolorum vitae reiciendis ipsum cum?
              </p>
            </div>
            <div className="box" data-aos="zoom-in-up">
              <img
                src={require("../../../imgs/Testimonios/Client3.jpeg")}
                alt="Latina D. Jacob
"
              />
              <h5>Latina D. Jacob</h5>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatem dignissimos corrupti earum iusto tempore inventore
                necessitatibus velit, perspiciatis aliquam quisquam, optio
                blanditiis neque rem natus dolorum vitae reiciendis ipsum cum?
              </p>
            </div>
            <div className="box" data-aos="zoom-in-up">
              <img
                src={require("../../../imgs/Testimonios/Client4.jpeg")}
                alt="Kimberlee B. Mullins
"
              />
              <h5>Kimberlee B. Mullins</h5>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatem dignissimos corrupti earum iusto tempore inventore
                necessitatibus velit, perspiciatis aliquam quisquam, optio
                blanditiis neque rem natus dolorum vitae reiciendis ipsum cum?
              </p>
            </div>
          </AutoplaySlider>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Testimonios;
