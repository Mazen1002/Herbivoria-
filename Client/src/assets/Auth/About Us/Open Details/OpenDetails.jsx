import React, { useState, useEffect } from "react";
import "./OpenDetails.css";

function OpenDetails() {
  const [days, SetDays] = useState([
    { name: "Sunday", time: "7:00 AM to 8:00 PM", active: false },
    { name: "Monday", time: "7:00 AM to 8:00 PM", active: false },
    { name: "Tuesday", time: "7:00 AM to 8:00 PM", active: false },
    { name: "Wednesday", time: "7:00 AM to 8:00 PM", active: false },
    { name: "Thursday", time: "7:00 AM to 8:00 PM", active: false },
    { name: "Friday", time: "9:00 AM to 5:00 PM", active: false },
    { name: "Saturday", time: "7:00 AM to 8:00 PM", active: false },
  ]);
  useEffect(() => {
    const NewDate = new Date().getDay();
    const NewDays = [...days];
    NewDays[NewDate] = { ...NewDays[NewDate], active: true };
    SetDays(NewDays);
  }, []);
  return (
    <React.Fragment>
      <div className="OpenDetails">
        <div className="container" data-aos="fade-up">
          <div className="head">
            <p>Come on in</p>
            <h1>We're Open</h1>
          </div>
          <div className="card">
            <ul>
              {days.map((day) => (
                <li className={day.active ? "active" : ""} key={day.name}>
                  <span>{day.name}</span>
                  <span>{day.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default OpenDetails;
