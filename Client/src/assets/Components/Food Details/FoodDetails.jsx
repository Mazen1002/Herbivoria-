import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./FoodDetails.css";
import { Player } from "@lottiefiles/react-lottie-player";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import Recommendation from "../Recommendation/Recommendation";
import Footer from "../Footer/Footer";
import Waves from "./../Waves/Waves";
import Testimonios from "../../Auth/Home/Testimonios/Testimonios";
import { useDispatch, useSelector } from "react-redux";
import {
  GetMenuProduct,
  SingleHandleChangeIsInCart,
} from "../../Toolkit/Slices/MenuSlice";
import LoadingData from "../LoadingData/LoadingData";
import {
  AddProduct,
  DeleteFromCartSync,
  DeleteProduct,
  HandleAddProduct,
} from "../../Toolkit/Slices/CartSlice";

function FoodDetails({ HandleISInCart, scrollToTop }) {
  const Params = useParams();
  const { SingleProduct, loading } = useSelector((State) => State.Menu);
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(GetMenuProduct({ _id: Params.id }));
  }, []);

  const HandleAddToCart = (_id, product) => {
    Dispatch(AddProduct(_id));
    Dispatch(HandleAddProduct({ product }));
    Dispatch(SingleHandleChangeIsInCart());
  };
  const HandleDeleteFromCart = (_id) => {
    Dispatch(DeleteProduct(_id));
    Dispatch(DeleteFromCartSync(_id));
    Dispatch(SingleHandleChangeIsInCart());
  };

  return (
    <React.Fragment>
      <div className={!SingleProduct ? "FoodDetails" : "FoodDetails active"}>
        <div className="container" data-aos="fade-up">
          <div className="links">
            <div className="menu-nav">
              <NavLink to="/">Home </NavLink>
              <NavLink to="/Menu">Menu </NavLink>
              <NavLink to={`/Details/${Params._id}`}>
                {SingleProduct ? SingleProduct.name : null}
              </NavLink>
            </div>
            {!SingleProduct ? null : (
              <i className="fa-regular fa-heart Favorite-ele" />
            )}
          </div>
          {loading ? (
            <LoadingData />
          ) : !SingleProduct ? (
            <div className="notfounded-element">
              <Player
                autoplay
                loop
                src="https://lottie.host/2f5f668c-3671-4831-a2a4-8101b7d334bc/281Jrokgmv.json"
                className="notfounded-elementPlayer"
              />
              <p>Sorry We Couldn't Find The element</p>
            </div>
          ) : (
            <React.Fragment>
              <div className="content">
                <div className="left">
                  <img src={SingleProduct.img} alt={SingleProduct.name} />
                </div>
                <div className="right">
                  <h1>{SingleProduct.name}</h1>
                  <div className="health-info">
                    <p>
                      Calories : <span>{SingleProduct.cal} cal</span>
                    </p>
                    <p>
                      Proteins : <span>{SingleProduct.Proteins}g</span>
                    </p>
                    <p>
                      Fats : <span>{SingleProduct.Fats}g</span>
                    </p>
                  </div>
                  <p>{SingleProduct.Details}</p>
                  <div className="actions">
                    <div className="price">${SingleProduct.price}.00</div>
                    <div className="btn-animation">
                      <button
                        onClick={
                          SingleProduct.IsinCart
                            ? () => HandleDeleteFromCart(SingleProduct._id)
                            : () => HandleAddToCart(SingleProduct._id)
                        }
                        className={SingleProduct.IsinCart ? "active" : ""}
                      >
                        {SingleProduct.IsinCart ? (
                          <RemoveShoppingCartOutlinedIcon />
                        ) : (
                          <ShoppingCartOutlinedIcon />
                        )}
                      </button>
                      <p>
                        {SingleProduct.IsinCart
                          ? "Remove From Cart"
                          : "Add To Cart"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>

      {SingleProduct ? <Waves styleWave="up" /> : null}
      {/************************** Start Recommendation *****************************/}
      <Recommendation
        HandleISInCart={HandleISInCart}
        min="40"
        max="48"
        scrollToTop={scrollToTop}
      />
      {/************************** End Recommendation *****************************/}
      {/************************** Start Testimonios *****************************/}
      <Testimonios />
      {/************************** End Testimonios *****************************/}
      {/************************** Start Footer *****************************/}
      <Footer />
      {/************************** End Footer *****************************/}
    </React.Fragment>
  );
}
export default FoodDetails;
