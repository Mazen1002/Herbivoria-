import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import App from "./App";
import "./assets/Css/normalize.css";
import "./assets/Css/root.css";
import "./assets/Css/style.css";
import "../node_modules/aos/dist/aos.css";
import Aos from "aos";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Store from "./assets/Toolkit/Store";
Aos.init({
  once: true,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={Store}>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>
);
