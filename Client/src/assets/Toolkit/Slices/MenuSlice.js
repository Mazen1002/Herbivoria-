import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Toast_Handelar from "../../Components/Toast_Handelar";

// Get all menu products
export const GetMenu = createAsyncThunk(
  "Menu/GetMenu",
  async (arg, { rejectWithValue, getState }) => {
    const State = getState();
    const { Token, _id } = State.User.RememberMe
      ? JSON.parse(localStorage.getItem("Token"))
      : JSON.parse(sessionStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API_URL}/Menu?Page=${
          arg.Page ? arg.Page : 1
        }&Limit=${arg.Limit ? arg.Limit : 10}`,
        {
          _id: _id,
          Calories: arg.Calories,
          Type: arg.Type,
          Price: arg.Price,
          Spicy: arg.Spicy,
        },
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

// Get single product
export const GetMenuProduct = createAsyncThunk(
  "Menu/GetMenu/Product_id",
  async (arg, { rejectWithValue, getState }) => {
    const State = getState();
    const { Token, _id } = State.User.RememberMe
      ? JSON.parse(localStorage.getItem("Token"))
      : JSON.parse(sessionStorage.getItem("Token"));

    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API_URL}/Menu/${arg._id}`,
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

const MenuSlice = createSlice({
  name: "MenuSlice",
  initialState: {
    loading: false,
    MenuData: [],
    Meta: {},
    SingleProduct: {},
  },
  reducers: {
    SingleHandleChangeIsInCart: (State, action) => {
      let NewProductState = { ...State.SingleProduct };
      NewProductState = {
        ...NewProductState,
        IsinCart: !NewProductState.IsinCart,
      };
      State.SingleProduct = NewProductState;
    },
    MenuHandleProductIsInCart: (State, action) => {
      const NewProductsState = [...State.MenuData];
      const SingleProduct = NewProductsState.filter(
        (product) => product._id == action.payload._id
      )[0];
      const ProudactId = NewProductsState.indexOf(SingleProduct);
      NewProductsState[ProudactId] = {
        ...SingleProduct,
        IsinCart: action.payload.IsinCart,
      };
      State.MenuData = [...NewProductsState];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetMenu.pending, (State, Action) => {
      State.loading = true;
    });
    builder.addCase(GetMenu.rejected, (State, Action) => {
      State.loading = false;
      Toast_Handelar("error", Action.payload.message);
    });
    builder.addCase(GetMenu.fulfilled, (State, Action) => {
      State.loading = false;
      State.MenuData = Action.payload.data.data;
      State.Meta = Action.payload.data.meta;
    });

    builder.addCase(GetMenuProduct.pending, (State, Action) => {
      State.loading = true;
    });
    builder.addCase(GetMenuProduct.rejected, (State, Action) => {
      State.loading = false;
      Toast_Handelar("error", Action.payload.message);
    });
    builder.addCase(GetMenuProduct.fulfilled, (State, Action) => {
      State.loading = false;
      State.SingleProduct = Action.payload.data;
    });
  },
});

export const { SingleHandleChangeIsInCart, MenuHandleProductIsInCart } =
  MenuSlice.actions;

export default MenuSlice.reducer;
