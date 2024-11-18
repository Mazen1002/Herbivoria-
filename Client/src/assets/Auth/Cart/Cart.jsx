import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import "./Cart.css";
import Select from "react-dropdown-select";
import { Player } from "@lottiefiles/react-lottie-player";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./payment";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteFromCartSync,
  DeleteProduct,
  GetCartProducts,
  HandleDecrement,
  HandleIncrement,
  UpdateCount,
} from "../../Toolkit/Slices/CartSlice";
import LoadingData from "../../Components/LoadingData/LoadingData";

function Cart() {
  const Dispatch = useDispatch();
  const { Loading, Cart } = useSelector((State) => State.Cart);
  const { user } = useSelector((State) => State.User);

  const [Subtotal, SetSubtotal] = useState(0);
  const [TotalPrice, SetTotalPrice] = useState(0);
  const [Address, SetAddress] = useState("");
  const [time_arrive, Settime_arrive] = useState(false);
  const [Payment_Method, SetPayment_Method] = useState(true);

  useEffect(() => {
    Dispatch(GetCartProducts());
  }, []);

  const [PaymentCard, SetPaymentCard] = useState({
    Card_Number: "",
    Card_Expiry: "",
    Card_CVC: "",
    Card_Name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    let { name, value } = evt.target;

    if (name === "Card_Number") {
      value = formatCreditCardNumber(value);
    } else if (name === "Card_Expiry") {
      value = formatExpirationDate(value);
    } else if (name === "Card_CVC") {
      value = formatCVC(value);
    }
    SetPaymentCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    SetPaymentCard((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const AddressData = [
    {
      value: "Bohemia, NY 11716",
      label: "Bohemia, NY 11716",
    },
    {
      value: "Columbia, SC 29204",
      label: "Columbia, SC 29204",
    },
  ];

  const CountPrice = () => {
    let Price = 0;
    Cart.map((Food) => (Price += Food.price * Food.Count));
    SetSubtotal(Price);
    if (Price === 0) {
      SetTotalPrice(0);
      return;
    }
    SetTotalPrice(Price + 3.67);
  };

  const HandleDecrementProduct = (_id) => {
    Dispatch(UpdateCount({ type: "Remove", _id: _id }));
    Dispatch(HandleDecrement(_id));
  };
  const HandleIncrementProduct = (_id) => {
    Dispatch(UpdateCount({ type: "ADD", _id: _id }));
    Dispatch(HandleIncrement(_id));
  };

  const HandleDeleteProduct = (_id) => {
    Dispatch(DeleteProduct(_id));
    Dispatch(DeleteFromCartSync(_id));
  };

  useEffect(() => {
    CountPrice();
  }, [HandleIncrementProduct, HandleDeleteProduct, HandleDecrementProduct]);

  return (
    <React.Fragment>
      <div className="Cart">
        <div className="container" data-aos="fade-up">
          {/***************************** left ******************************/}
          <div className="left">
            {/*****************************First Box******************************/}
            <div className="box">
              <h1>Contact information</h1>
              <div className="input-container">
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Alica Simpson"
                    value={user.FirstName}
                  />
                  <label htmlFor="Name">Name</label>
                </div>
                <div className="input-box">
                  <input
                    type="Phone"
                    placeholder="+ (987) 000 654 321 "
                    value={user?.Mobile}
                  />
                  <label htmlFor="Name">Phone</label>
                </div>
              </div>
            </div>
            {/*****************************2'nd Box******************************/}
            <div className="box">
              <h1>Order Type</h1>
              <div className="input-container">
                <div className="input-check">
                  <input type="radio" name="type" id="Pickup" checked />
                  <label htmlFor="Pickup">Pickup</label>
                </div>
                <div className="input-check">
                  <input type="radio" name="type" id="Delivery" />
                  <label htmlFor="Delivery">Delivery</label>
                </div>
              </div>
              <div className="Select-box">
                <label htmlFor="Address">Select Address from your Saved</label>
                <Select
                  options={AddressData}
                  onChange={(values) => SetAddress(values)}
                  placeholder="Select Address"
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  id="Addressdelivery"
                  placeholder="Enter your delivery address"
                />
                <label htmlFor="Addressdelivery">Address *</label>
              </div>
              <div className="input-container">
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Example: Flat #12"
                    id="Apartment / Office*"
                  />
                  <label htmlFor="Apartment / Office*">
                    Apartment / Office*
                  </label>
                </div>
                <div className="input-box">
                  <input type="text" placeholder="Example: 3 " id="Floor" />
                  <label htmlFor="Floor">Floor</label>
                </div>
              </div>
            </div>
            {/*****************************3'nd Box******************************/}
            <div className="box">
              <h1>Delivery Time</h1>
              <div className="input-container">
                <div className="input-check">
                  <input
                    type="radio"
                    name="time_arrive"
                    id="Soon"
                    checked={time_arrive ? false : true}
                  />
                  <label htmlFor="Soon" onClick={() => Settime_arrive(false)}>
                    As Soon as possible
                  </label>
                </div>
                <div className="input-check">
                  <input
                    type="radio"
                    name="time_arrive"
                    id="Time"
                    checked={time_arrive ? true : false}
                  />
                  <label htmlFor="Time" onClick={() => Settime_arrive(true)}>
                    Select Time
                  </label>
                </div>
              </div>
              {time_arrive ? (
                <div className="input-box">
                  <input
                    type="time"
                    placeholder="Enter Time "
                    id="timeArrive"
                  />
                  <label htmlFor="timeArrive">Time Arrive</label>
                </div>
              ) : null}
            </div>
            <div className="box">
              <h1>Payment Method</h1>
              <div className="input-container">
                <div className="input-check">
                  <input
                    type="radio"
                    name="Payment Method"
                    id="Cash"
                    checked={Payment_Method ? false : true}
                  />
                  <label
                    htmlFor="Cash"
                    onClick={() => SetPayment_Method(false)}
                  >
                    Cash
                  </label>
                </div>
                <div className="input-check">
                  <input
                    type="radio"
                    name="Payment Method"
                    id="Online Payment"
                    checked={Payment_Method ? true : false}
                  />
                  <label
                    htmlFor="Online Payment"
                    onClick={() => SetPayment_Method(true)}
                  >
                    Online Payment
                  </label>
                </div>
              </div>
              {Payment_Method ? (
                <React.Fragment>
                  <div className="box">
                    <Cards
                      number={PaymentCard.Card_Number}
                      expiry={PaymentCard.Card_Expiry}
                      cvc={PaymentCard.Card_CVC}
                      name={PaymentCard.Card_Name}
                      focused={PaymentCard.focus}
                    />
                  </div>
                  <div className="payment-box">
                    <div className="input-container">
                      <div className="input-check">
                        <input type="radio" name="payment" id="Strip" />
                        <label htmlFor="Strip">
                          <img
                            src={require("../../imgs/payment/pay(1).png")}
                            alt="Strip"
                          />
                        </label>
                      </div>
                      <div className="input-check">
                        <input type="radio" name="payment" id="Visa" />
                        <label htmlFor="Visa">
                          <img
                            src={require("../../imgs/payment/pay(2).png")}
                            alt="Visa"
                          />
                        </label>
                      </div>
                      <div className="input-check">
                        <input type="radio" name="payment" id="master" />
                        <label htmlFor="master">
                          <img
                            src={require("../../imgs/payment/pay(3).png")}
                            alt="master"
                          />
                        </label>
                      </div>
                      <div className="input-check">
                        <input type="radio" name="payment" id="amazon" />
                        <label htmlFor="amazon">
                          <img
                            src={require("../../imgs/payment/pay(4).png")}
                            alt="amazon"
                          />
                        </label>
                      </div>
                      <div className="input-check">
                        <input type="radio" name="payment" id="klarna" />
                        <label htmlFor="klarna">
                          <img
                            src={require("../../imgs/payment/pay(5).png")}
                            alt="klarna"
                          />
                        </label>
                      </div>
                      <div className="input-check">
                        <input type="radio" name="payment" id="paypal" />
                        <label htmlFor="paypal">
                          <img
                            src={require("../../imgs/payment/pay(6).png")}
                            alt="paypal"
                          />
                        </label>
                      </div>
                      <div className="input-check">
                        <input type="radio" name="payment" id="applepay" />
                        <label htmlFor="applepay">
                          <img
                            src={require("../../imgs/payment/pay(7).png")}
                            alt="applepay"
                          />
                        </label>
                      </div>
                      <div className="input-check">
                        <input type="radio" name="payment" id="Gppglepay" />
                        <label htmlFor="Gppglepay">
                          <img
                            src={require("../../imgs/payment/pay(8).png")}
                            alt="Gppglepay"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="input-container">
                    <div className="input-box">
                      <input
                        type="tel"
                        placeholder="0000 0000 0000 0000"
                        maxLength="19"
                        id="Card Number"
                        name="Card_Number"
                        value={PaymentCard.Card_Number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        pattern="[\d| ]{16,22}"
                      />
                      <label htmlFor="Card Number">Card Number</label>
                    </div>
                    <div className="input-box">
                      <input
                        type="text"
                        placeholder="Enter Your name here"
                        id="Name on Card"
                        value={PaymentCard.Card_Name}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        name="Card_Name"
                      />
                      <label htmlFor="Name on Card">Name on Card</label>
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input-box">
                      <input
                        type="tel"
                        placeholder="MM / YY"
                        maxLength="5"
                        id="Expiry Date"
                        value={PaymentCard.Card_Expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        name="Card_Expiry"
                        pattern="\d\d/\d\d"
                      />
                      <label htmlFor="Expiry Date">Expiry Date</label>
                    </div>
                    <div className="input-box">
                      <input
                        type="tel"
                        placeholder="***"
                        id="CVC"
                        value={PaymentCard.Card_CVC}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        name="Card_CVC"
                        pattern="\d{3,4}"
                      />
                      <label htmlFor="CVC">CVC</label>
                    </div>
                  </div>
                  <div className="add-save">
                    <label className="input-togle" htmlFor="SaveCard">
                      <input type="checkbox" id="SaveCard" />
                      <div className="toggle-switch"></div>
                      <span>Save this Card</span>
                    </label>
                    <button>
                      <i className="fa-solid fa-plus" />
                      <span>Add another</span>
                    </button>
                  </div>
                </React.Fragment>
              ) : null}
            </div>
          </div>
          {/***************************** Right ******************************/}
          <div className="right">
            {Loading ? (
              <LoadingData />
            ) : Cart.length > 0 ? (
              <React.Fragment>
                {/***************************** Orders ******************************/}
                <div className="order">
                  <p>Order Summary</p>
                  {Cart.map((food) => (
                    <div className="food-box" key={food._id}>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => HandleDeleteProduct(food._id)}
                      />
                      <div className="food-box-left">
                        <div className="img-box">
                          <img src={food.img} alt={food.name} />
                        </div>
                        <div className="data">
                          <h5>{food.name}</h5>
                          <p className="price">{food.price}$</p>
                        </div>
                      </div>
                      <div className="food-box-right">
                        <div className="actions">
                          <button
                            onClick={() => HandleDecrementProduct(food._id)}
                          >
                            -
                          </button>
                          <p className="Count">{food.Count}</p>
                          <button
                            onClick={() => HandleIncrementProduct(food._id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/***************************** Total Price ******************************/}
                <div className="total-price">
                  <div className="box">
                    <p>Subtotal :</p>
                    <span>{Subtotal} $</span>
                  </div>
                  <div className="box">
                    <p>Shipping :</p>
                    <span>3.67 $</span>
                  </div>
                </div>
                {/***************************** Final Price ******************************/}
                <div className="final-price">
                  <div className="box">
                    <p>Total :</p>
                    <span>{TotalPrice} $</span>
                  </div>
                  <button>Make Payment</button>
                  <p>
                    By placing your order, you agree to Terms of use and Privacy
                    agreement
                  </p>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="no-items">
                  <Player
                    autoplay
                    loop
                    src="https://lottie.host/6ee725b6-9c5f-4fe0-aa44-85e012cd1b6b/NFWzJ4AAg6.json"
                    style={{ height: "300px", width: "300px" }}
                  />
                  <p>Cart is empty </p>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Cart;
