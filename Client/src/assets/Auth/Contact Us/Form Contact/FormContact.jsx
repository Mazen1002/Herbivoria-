import React, { useEffect, useState } from "react";
import "./FormContact.css";
import { useSelector } from "react-redux";

function FormContact() {
  const { user, loading } = useSelector((State) => State.User);
  const [UserData, SetUserData] = useState({});
  const [Message, SetMessage] = useState("");

  useEffect(() => {
    SetUserData(user);
  }, [loading]);

  return (
    <React.Fragment>
      <div className="formcontact">
        <div className="container" data-aos="fade-up">
          <div className="head">
            <p>Contact</p>
            <h1>Enter your Issue</h1>
          </div>
          <div className="form-container">
            <div className="left">
              <input
                type="text"
                placeholder="First Name"
                value={UserData.FirstName}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={UserData.LastName}
              />
              <input
                type="email"
                placeholder="enter your Email"
                required
                value={UserData.email}
              />
            </div>
            <div className="right">
              <textarea
                placeholder="Enter Your Message here ..."
                value={Message}
                onChange={(e) => SetMessage(e.target.value)}
              />
              <input type="button" value="Submit" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default FormContact;
