import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Toast_Handelar from "../../Components/Toast_Handelar";

export const HandleRegister = createAsyncThunk(
  "HandleRegister",
  async (USER, { rejectWithValue }) => {
    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API_URL}/Users/Register`,
        {
          email: USER.Email,
          password: USER.Password,
          FirstName: USER.FirstName,
          LastName: USER.LastName,
          Gender: USER.Gender,
          Mobile: USER.Mobile,
        },
      );
      return Data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const RegisterSlice = createSlice({
  name: "Register",
  initialState: {
    loading: false,
    errors: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HandleRegister.pending, (State, Action) => {
      State.loading = true;
    });
    builder.addCase(HandleRegister.rejected, (State, Action) => {
      State.loading = false;
      if (Action.payload.data !== undefined) State.errors = Action.payload.data;
      else Toast_Handelar("error", Action.payload.message);
    });
    builder.addCase(HandleRegister.fulfilled, (State, Action) => {
      State.loading = false;
      State.errors = {};
      Toast_Handelar("success", Action.payload.message);
    });
  },
});

export const {} = RegisterSlice.actions;

export default RegisterSlice.reducer;
