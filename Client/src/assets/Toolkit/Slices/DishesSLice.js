import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Toast_Handelar from "../../Components/Toast_Handelar";

// Get All dishes
export const GetMenuDishes = createAsyncThunk(
  "Menu/GetMenu/FilterDishes",
  async (arg, { rejectWithValue, getState }) => {
    const State = getState();
    const { Token, _id } = State.User.RememberMe
      ? JSON.parse(localStorage.getItem("Token"))
      : JSON.parse(sessionStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API_URL}/Menu/Filter/Dish?Page=${
          arg.Page ? arg.Page : 1
        }&Limit=${arg.Limit ? arg.Limit : 10}`,
        { _id },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const DishesSLice = createSlice({
  name: "DishesSLice",
  initialState: {
    DishesData: [],
    DishesMeta: {},
    LoadingDishes: false,
  },
  reducers: {
    MenuHandleDishesIsInCart: (State, action) => {
      const NewProductsState = [...State.DishesData];
      const SingleProduct = NewProductsState.filter(
        (product) => product._id == action.payload._id
      )[0];
      const ProudactId = NewProductsState.indexOf(SingleProduct);
      NewProductsState[ProudactId] = {
        ...SingleProduct,
        IsinCart: action.payload.IsinCart,
      };
      State.DishesData = [...NewProductsState];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetMenuDishes.pending, (State, Action) => {
      State.LoadingDishes = true;
    });
    builder.addCase(GetMenuDishes.rejected, (State, Action) => {
      State.LoadingDishes = false;
      Toast_Handelar("error", Action.payload.message);
    });
    builder.addCase(GetMenuDishes.fulfilled, (State, Action) => {
      State.LoadingDishes = false;
      State.DishesData = Action.payload.data.data;
      State.DishesMeta = Action.payload.data.meta;
    });
  },
});

export const { MenuHandleDishesIsInCart } = DishesSLice.actions;

export default DishesSLice.reducer;
