import React from "react";
import "./ContactUs.css";
import Footer from "./../../Components/Footer/Footer";
import Frequently from "./Frequently/Frequently";
import Waves from "./../../Components/Waves/Waves";
import FormContact from "./Form Contact/FormContact";

function ContactUs() {
  return (
    <React.Fragment>
      <div className="ContactUs">
        <div className="container" data-aos="zoom-in-up">
          <div className="left">
            <h1>
              <i className="fa-solid fa-headset" />
              Contact US
            </h1>
            <p>
              Need to get in touch with us ? Either fill out the form with your
              inquiry or find the department email you'd like to contact below .
            </p>

            <div className="contact-box">
              <a href="tel:+20 1111111111" className="contact">
                <i className="fa-solid fa-phone" />
                <span>+20 1111111111</span>
              </a>
              <a href="mailto:+20 1111111111" className="contact">
                <i className="fa-solid fa-envelope" />
                <span>Herbivoria@gmail.com</span>
              </a>
              <div className="contact">
                <i className="fa-solid fa-location-dot" />
                <span>82 St Sphinx street</span>
              </div>
            </div>
          </div>
          <div className="right">
            <img src={require("../../imgs/support-img.png")} alt="support" />
          </div>
        </div>
      </div>
      <Waves styleWave="up" />
      {/************************** start Form Contact *****************************/}
      <FormContact />
      {/************************** End Form Contact *****************************/}
      {/************************** start Frequently *****************************/}
      <Frequently />
      {/************************** End Frequently *****************************/}
      {/************************** start Footer *****************************/}
      <Footer />
      {/************************** End Footer *****************************/}
    </React.Fragment>
  );
}
export default ContactUs;
