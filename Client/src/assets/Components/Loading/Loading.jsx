import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <React.Fragment>
      <div className="loading">
        <div className="container">
          <img
            src={require("../../imgs/Herbivoria.png")}
            alt="Herbivoria"
            className="HerbivoriaLogo"
          />
          <p>Loading</p>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Loading;
