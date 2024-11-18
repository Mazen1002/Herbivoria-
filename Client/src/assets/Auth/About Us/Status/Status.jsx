import React from "react";
import CountUp from "react-countup";
import "./Status.css";

export default function Status() {
  return (
    <React.Fragment>
      <div className="Status">
        <div className="container" data-aos="fade-up">
          <div className="box">
            <span>
              <CountUp start={0} end={262} duration={2.75} separator=" " />
            </span>
            <p>Clients</p>
          </div>
          <div className="box">
            <span>
              <CountUp start={0} end={521} duration={2.75} separator=" " />
            </span>
            <p>Projects</p>
          </div>
          <div className="box">
            <span>
              <CountUp start={0} end={1453} duration={2.75} separator=" " />
            </span>
            <p>Hours Of Support</p>
          </div>
          <div className="box">
            <span>
              <CountUp start={0} end={32} duration={2.75} separator=" " />
            </span>
            <p>Workers</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
