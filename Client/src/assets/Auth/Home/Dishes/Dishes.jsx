import React, { useContext, useEffect, useState } from "react";
import "./Dishes.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetMenuDishes,
  MenuHandleDishesIsInCart,
} from "../../../Toolkit/Slices/DishesSLice";
import LoadingData from "../../../Components/LoadingData/LoadingData";
import ResponsivePagination from "react-responsive-pagination";
import {
  AddProduct,
  DeleteFromCartSync,
  DeleteProduct,
  HandleAddProduct,
} from "../../../Toolkit/Slices/CartSlice";

function Dishes() {
  const [currentPage, setCurrentPage] = useState(1);
  const { DishesData, DishesMeta, LoadingDishes } = useSelector(
    (State) => State.Dishes
  );
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(
      GetMenuDishes({
        Page: currentPage,
        Limit: 8,
      })
    );
  }, [currentPage]);

  const HandleAddToCart = (_id, product) => {
    Dispatch(AddProduct(_id));
    Dispatch(HandleAddProduct({ product }));
    Dispatch(MenuHandleDishesIsInCart({ _id, IsinCart: true }));
  };
  const HandleDeleteFromCart = (_id) => {
    Dispatch(DeleteProduct(_id));
    Dispatch(DeleteFromCartSync(_id));
    Dispatch(MenuHandleDishesIsInCart({ _id, IsinCart: false }));
  };

  return (
    <React.Fragment>
      <div className="dishes">
        <div className="container" data-aos="fade-up">
          <div className="head">
            <p>our dishes</p>
            <h1>most trending dishes</h1>
          </div>
          {LoadingDishes ? (
            <LoadingData />
          ) : (
            <>
              <div className="dishes-container">
                {DishesData.map((dish) => (
                  <div className="box" key={dish._id}>
                    <i className="fa-regular fa-heart Favorite-ele" />
                    <div className="price">{dish.price} $</div>
                    <Link className="Content" to={`/Details/${dish._id}`}>
                      <img src={dish.img} alt="fries_Salade" />
                      <h5>
                        {dish.name.length > 10
                          ? `${dish.name.slice(0, 10) + `...`}`
                          : dish.name}
                      </h5>
                      <p>{dish.Details.slice(0, 50)}...</p>
                    </Link>

                    <button
                      className={dish.IsinCart ? "btn active" : "btn"}
                      onClick={
                        dish.IsinCart
                          ? () => HandleDeleteFromCart(dish._id)
                          : () => HandleAddToCart(dish._id, dish)
                      }
                    >
                      <span> Oreder now</span>
                      <i className="fa-solid fa-cart-plus" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="PaginationSection">
                <ResponsivePagination
                  current={currentPage}
                  total={DishesMeta.TotalPages}
                  onPageChange={setCurrentPage}
                  maxWidth={20}
                  previousLabel={<i className="fa-solid fa-chevron-left"></i>}
                  nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Dishes;
