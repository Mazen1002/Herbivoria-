import React, { useRef, lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Loading from "../Components/Loading/Loading";
import Toast_Handelar from "../Components/Toast_Handelar";

const Home = lazy(() => import("./Home/Home"));
const Menu = lazy(() => import("./Menu/Menu"));
const FoodDetails = lazy(() =>
  import("../Components/Food Details/FoodDetails")
);
const ContactUs = lazy(() => import("./Contact Us/ContactUs"));
const AboutUs = lazy(() => import("./About Us/AboutUs"));
const Cart = lazy(() => import("./Cart/Cart"));
const NotFounded = lazy(() => import("../Components/Not Founded/NotFounded"));

function Auth() {
  const back_to_top_btn = useRef();
  const Navigate = useNavigate();

  /*************************************************
   # Scroll Events
  *****************************************************/
  window.onscroll = () => {
    if (window.scrollY > 150) {
      back_to_top_btn.current.classList.add("active");
    } else {
      back_to_top_btn.current.classList.remove("active");
    }

    return () => (window.onscroll = null);
  };
  /*************************************************
   # Scroll Events
  *****************************************************/
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const HandleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    Navigate("/");
    Toast_Handelar("success", "Successfully Logout!");
  };

  return (
    <React.Fragment>
      <div className="auth">
        {/*=========================================================
           # Navbar 
          =========================================================*/}
        <Navbar scrollToTop={scrollToTop} HandleLogout={HandleLogout} />
        {/*=========================================================
           # Pages Routes 
          =========================================================*/}
        <div className="pages">
          <i
            className="fa-solid fa-arrow-up back-to-top"
            onClick={() => scrollToTop()}
            ref={back_to_top_btn}
          />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home scrollToTop={scrollToTop} />} />
              <Route
                path="/Menu"
                element={<Menu scrollToTop={scrollToTop} />}
              />
              <Route
                path="/Details/:id"
                element={<FoodDetails scrollToTop={scrollToTop} />}
              />
              <Route path="/Contact_Us" element={<ContactUs />} />
              <Route path="/About_Us" element={<AboutUs />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="*" element={<NotFounded style={`auto`} />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Auth;
