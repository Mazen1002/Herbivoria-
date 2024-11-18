import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import WindowIcon from "@mui/icons-material/Window";
import ReorderIcon from "@mui/icons-material/Reorder";
import MenuController from "./MenuController";
import "./Menu.css";
import Footer from "../../Components/Footer/Footer";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Player } from "@lottiefiles/react-lottie-player";
import Recommendation from "../../Components/Recommendation/Recommendation";
import Testimonios from "../Home/Testimonios/Testimonios";
import ResponsivePagination from "react-responsive-pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  GetMenu,
  MenuHandleProductIsInCart,
} from "../../Toolkit/Slices/MenuSlice";
import LoadingData from "../../Components/LoadingData/LoadingData";
import {
  AddProduct,
  DeleteFromCartSync,
  DeleteProduct,
  HandleAddProduct,
} from "../../Toolkit/Slices/CartSlice";

function Menu({ scrollToTop }) {
  const Dispatch = useDispatch();

  const [MenuCalories, SetMenuCalories] = useState([0, 1000]);
  const [MenuSpicy, SetMenuSpicy] = useState(false);
  const [MenuPrice, SetMenuPrice] = useState([0, 1000]);
  const [MenuWidth_length, SetMenuWidth_length] = useState("16.5-25");
  const [FoodType, SetFoodType] = useState("");

  const [StyleCard, SetStyleCard] = useState("Grid");
  const [ControlFilter, SetControlFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, MenuData, Meta } = useSelector((State) => State.Menu);

  useEffect(() => {
    Dispatch(
      GetMenu({
        Calories: MenuCalories,
        Type: FoodType,
        Price: MenuPrice,
        Spicy: MenuSpicy ? true : "",
        Page: currentPage,
        Limit: 15,
      })
    );
  }, [currentPage]);

  const HandleReset = async () => {
    SetMenuCalories([0, 1000]);
    SetMenuSpicy(false);
    SetMenuPrice([0, 1000]);
    SetMenuWidth_length("16.5-25");
    SetFoodType("");
    setCurrentPage(1);
    Dispatch(
      GetMenu({
        Calories: [0, 1000],
        Type: "",
        Price: [0, 1000],
        Spicy: "",
        Page: 1,
        Limit: 15,
      })
    );
  };

  const HandleSendData = async () => {
    setCurrentPage(1);
    Dispatch(
      GetMenu({
        Calories: MenuCalories,
        Type: FoodType,
        Price: MenuPrice,
        Spicy: MenuSpicy ? true : "",
        Page: currentPage,
        Limit: 15,
      })
    );
  };

  const HandleAddToCart = (_id, product) => {
    Dispatch(AddProduct(_id));
    Dispatch(HandleAddProduct({ product }));
    Dispatch(MenuHandleProductIsInCart({ _id, IsinCart: true }));
  };
  const HandleDeleteFromCart = (_id) => {
    Dispatch(DeleteProduct(_id));
    Dispatch(DeleteFromCartSync(_id));
    Dispatch(MenuHandleProductIsInCart({ _id, IsinCart: false }));
  };

  return (
    <React.Fragment>
      <div className="menu-food">
        <div className="container">
          <div className="links">
            <div className="menu-nav">
              <NavLink to="/">Home </NavLink>
              <NavLink to="/Menu">Menu </NavLink>
            </div>
            <div className="style-card">
              <i
                className="fa-solid fa-gear Filter-Setting"
                onClick={() => SetControlFilter(!ControlFilter)}
              />
              <WindowIcon
                className={StyleCard === "Grid" ? "active" : ""}
                onClick={() => SetStyleCard("Grid")}
              />
              <ReorderIcon
                className={StyleCard === "List" ? "active" : ""}
                onClick={() => SetStyleCard("List")}
              />
            </div>
          </div>
          <div className="content">
            <MenuController
              ControlFilter={ControlFilter}
              SetControlFilter={SetControlFilter}
              MenuCalories={MenuCalories}
              SetMenuCalories={SetMenuCalories}
              MenuSpicy={MenuSpicy}
              SetMenuSpicy={SetMenuSpicy}
              MenuPrice={MenuPrice}
              SetMenuPrice={SetMenuPrice}
              MenuWidth_length={MenuWidth_length}
              SetMenuWidth_length={SetMenuWidth_length}
              FoodType={FoodType}
              SetFoodType={SetFoodType}
              HandleReset={HandleReset}
              HandleSendData={HandleSendData}
            />

            {loading ? (
              <LoadingData />
            ) : !loading && MenuData.length > 0 ? (
              <div className={`right ${StyleCard}`}>
                {MenuData.map((item) => (
                  <React.Fragment>
                    {StyleCard === "Grid" ? (
                      <div className="food-box" key={item._id}>
                        <i className="fa-regular fa-heart Favorite-ele" />
                        <Link
                          to={`/Details/${item._id}`}
                          onClick={() => scrollToTop()}
                        >
                          <img src={item.img} alt={item.name} />
                          <h5>
                            {item.name.length > 10
                              ? `${item.name.slice(0, 10) + `...`}`
                              : item.name}
                          </h5>
                          <p>
                            {item.Details.length > 50
                              ? `${item.Details.slice(0, 50)}...`
                              : item.Details}
                          </p>
                        </Link>

                        <div className="actions">
                          <div className="price">{item.price} $</div>
                          <button
                            className={item.IsinCart ? "btn active" : "btn"}
                            onClick={
                              item.IsinCart
                                ? () => HandleDeleteFromCart(item._id)
                                : () => HandleAddToCart(item._id, item)
                            }
                          >
                            <ShoppingCartOutlinedIcon />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="food-box" key={item._id}>
                        <Link
                          className="left"
                          to={`/Details/${item.id}`}
                          onClick={() => scrollToTop()}
                        >
                          <img src={item.img} alt={item.name} />
                        </Link>

                        <div className="right">
                          <Link
                            className="info"
                            to={`/Details/${item.id}`}
                            onClick={() => scrollToTop()}
                          >
                            <h5>{item.name}</h5>
                            <p>{item.Details}</p>
                          </Link>
                          <div className="info actions">
                            <div className="price">{item.price}$</div>
                            <button
                              className={item.isInCart ? "btn active" : "btn"}
                              onClick={
                                item.IsinCart
                                  ? () => HandleDeleteFromCart(item._id)
                                  : () => HandleAddToCart(item._id, item)
                              }
                            >
                              <ShoppingCartOutlinedIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="not-found">
                <Player
                  autoplay
                  loop
                  src="https://lottie.host/593ba6a9-716f-43b6-908a-2c48b99d0b40/e6Bkgj0XMe.json"
                  style={{ height: "300px", width: "300px" }}
                />
                <p>Sorry We Couldn't Find what are searching for</p>
              </div>
            )}
          </div>
          <div className="PaginationSection">
            <ResponsivePagination
              current={currentPage}
              total={Meta.TotalPages}
              onPageChange={setCurrentPage}
              maxWidth={20}
              previousLabel={<i className="fa-solid fa-chevron-left"></i>}
              nextLabel={<i className="fa-solid fa-chevron-right"></i>}
            />
          </div>
        </div>
      </div>
      {/************************** Recommendation *****************************/}
      <Recommendation
        HandleISInCart={() => {}}
        min="58"
        max="68"
        ActiveBorder={true}
        scrollToTop={scrollToTop}
      />
      {/************************** End Recommendation *****************************/}
      {/************************** Testimonios *****************************/}
      <Testimonios />
      {/************************** End Testimonios *****************************/}
      {/************************** Footer *****************************/}
      <Footer />
      {/************************** End Footer *****************************/}
    </React.Fragment>
  );
}

export default Menu;
