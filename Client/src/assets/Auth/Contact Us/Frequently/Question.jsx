import React, { useState } from "react";

function Question({ Qu, Ans, active }) {
  const [BoxActive, SetBoxActive] = useState(active);
  return (
    <React.Fragment>
      <div className="Question-box">
        <div className="qu-text">
          <div className="left">
            <i
              className={
                BoxActive
                  ? "fa-solid fa-question active"
                  : "fa-solid fa-question"
              }
            />
            <h1
              className={BoxActive ? "active" : ""}
              onClick={() => SetBoxActive(!BoxActive)}
            >
              {Qu}
            </h1>
          </div>
          <div className="right">
            {BoxActive ? (
              <i
                className="fa-solid fa-angle-up active"
                onClick={() => SetBoxActive(!BoxActive)}
              />
            ) : (
              <i
                className="fa-solid fa-angle-down"
                onClick={() => SetBoxActive(!BoxActive)}
              />
            )}
          </div>
        </div>
        <div className={BoxActive ? "ans active" : "ans"}>
          <p>{Ans}</p>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Question;
