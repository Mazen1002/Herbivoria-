import React from "react";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Slider from "@mui/material/Slider";

function MenuController({
  SetControlFilter,
  ControlFilter,
  MenuCalories,
  SetMenuCalories,
  MenuSpicy,
  SetMenuSpicy,
  MenuWidth_length,
  SetMenuWidth_length,
  FoodType,
  SetFoodType,
  HandleReset,
  MenuPrice,
  SetMenuPrice,
  HandleSendData,
}) {
  const MenuHandleChangeCaloriesOrPrice = (value, index, type) => {
    if (type === "Calories") {
      const Data = [...MenuCalories];
      Data[index] = value;
      SetMenuCalories(Data);
    } else if (type === "Price") {
      const Data = [...MenuPrice];
      Data[index] = value;
      SetMenuPrice(Data);
    }
  };

  return (
    <React.Fragment>
      <div
        className={ControlFilter ? "menu-controller active" : "menu-controller"}
      >
        <i
          className="fa-solid fa-xmark exit-menu-controller"
          onClick={() => SetControlFilter(!ControlFilter)}
        />
        <div className="box">
          <h3>Food & Drinks</h3>
          <div className="filter">
            <i
              className={
                FoodType === "Meal"
                  ? "fa-solid fa-cookie-bite active"
                  : "fa-solid fa-cookie-bite"
              }
              onClick={() => SetFoodType("Meal")}
            />
            <i
              className={
                FoodType === "Burger"
                  ? "fa-solid fa-burger active"
                  : "fa-solid fa-burger"
              }
              onClick={() => SetFoodType("Burger")}
            />
            <i
              className={
                FoodType === "Pizza"
                  ? "fa-solid fa-pizza-slice active"
                  : "fa-solid fa-pizza-slice"
              }
              onClick={() => SetFoodType("Pizza")}
            />
            <i
              className={
                FoodType === "Dish"
                  ? "fa-solid fa-utensils active"
                  : "fa-solid fa-utensils"
              }
              onClick={() => SetFoodType("Dish")}
            />
            <i
              className={
                FoodType === "Drink"
                  ? "fa-solid fa-martini-glass active"
                  : "fa-solid fa-martini-glass"
              }
              onClick={() => SetFoodType("Drink")}
            />
          </div>
        </div>
        <div className="box">
          <h3>Calories</h3>
          <Slider
            value={MenuCalories}
            onChange={(e) => SetMenuCalories(e.target.value)}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            className="Slider"
          />
          <div className="inputs-box">
            <input
              type="text"
              value={MenuCalories[0]}
              onChange={(e) =>
                MenuHandleChangeCaloriesOrPrice(e.target.value, 0, "Calories")
              }
            />
            <HorizontalRuleIcon />
            <input
              type="text"
              value={MenuCalories[1]}
              onChange={(e) =>
                MenuHandleChangeCaloriesOrPrice(e.target.value, 1, "Calories")
              }
            />
          </div>
        </div>
        <div className="box">
          <h3>Price</h3>
          <div className="inputs-box">
            <input
              type="text"
              value={MenuPrice[0]}
              onChange={(e) =>
                MenuHandleChangeCaloriesOrPrice(e.target.value, 0, "Price")
              }
            />
            <HorizontalRuleIcon />
            <input
              type="text"
              value={MenuPrice[1]}
              onChange={(e) =>
                MenuHandleChangeCaloriesOrPrice(e.target.value, 1, "Price")
              }
            />
          </div>
        </div>
        <div className="box">
          <input
            type="checkbox"
            name="Spicy"
            id="Spicy"
            className="CheckSpicyinput"
            checked={MenuSpicy}
          />
          <label
            htmlFor="Spicy"
            className="CheckSpicy"
            onClick={() => SetMenuSpicy(!MenuSpicy)}
          >
            Spicy
          </label>
        </div>
        {FoodType === "Burger" && (
          <div className="box">
            <h3>Pound Bun Size</h3>
            <ul className="PoundSize">
              <div className="info">
                <span>Width</span>
                <span>length</span>
              </div>
              <input
                type="radio"
                name="Width&length"
                id="16.5-25"
                checked={MenuWidth_length === "16.5-25"}
              />
              <li onClick={() => SetMenuWidth_length("16.5-25")}>
                <label htmlFor="16.5-25">16.5"</label>
                <label htmlFor="16.5-25">25"</label>
              </li>
              <input
                type="radio"
                name="Width&length"
                id="17.5-26"
                checked={MenuWidth_length === "17.5-26"}
              />
              <li onClick={() => SetMenuWidth_length("17.5-26")}>
                <label htmlFor="17.5-26">17.5"</label>
                <label htmlFor="17.5-26">26"</label>
              </li>
              <input
                type="radio"
                name="Width&length"
                id="18.5-27"
                checked={MenuWidth_length === "18.5-27"}
              />
              <li onClick={() => SetMenuWidth_length("18.5-27")}>
                <label htmlFor="18.5-27">18.5"</label>
                <label htmlFor="18.5-27">27"</label>
              </li>
              <input
                type="radio"
                name="Width&length"
                id="19.5-28"
                checked={MenuWidth_length === "19.5-28"}
              />
              <li onClick={() => SetMenuWidth_length("19.5-28")}>
                <label htmlFor="19.5-28">19.5"</label>
                <label htmlFor="19.5-28">28"</label>
              </li>
            </ul>
          </div>
        )}
        <div className="box search">
          <button onClick={() => HandleSendData()}>Search</button>
          <button onClick={() => HandleReset()}>Reset</button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default MenuController;
