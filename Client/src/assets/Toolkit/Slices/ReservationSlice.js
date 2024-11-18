import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Toast_Handelar from "../../Components/Toast_Handelar";

export const HandleCheckTable = createAsyncThunk(
  "HandleCheckTable",
  async (DataForm, { rejectWithValue, getState }) => {
    try {
      const State = getState();
      const { Token, _id } = State.User.RememberMe
        ? JSON.parse(localStorage.getItem("Token"))
        : JSON.parse(sessionStorage.getItem("Token"));

      const Data = await axios.post(
        `${process.env.REACT_APP_API_URL}/Reservation/Check`,
        {
          name: DataForm.name,
          email: DataForm.email,
          phone: DataForm.phone,
          numberOfGuests: DataForm.numberOfGuests,
          date: DataForm.date,
          startTime: DataForm.startTime,
          endTime: DataForm.endTime,
        },
        { headers: { Authorization: Token } }
      );
      return Data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const HandleReservationTable = createAsyncThunk(
  "HandleReservationTable",
  async (USER, { rejectWithValue, getState }) => {
    try {
      const State = getState();
      const { Token, _id } = State.User.RememberMe
        ? JSON.parse(localStorage.getItem("Token"))
        : JSON.parse(sessionStorage.getItem("Token"));

      const Data = await axios.post(
        `${process.env.REACT_APP_API_URL}/Reservation/Make`,
        {
          name: USER.name,
          email: USER.email,
          phone: USER.phone,
          numberOfGuests: USER.numberOfGuests,
          date: USER.date,
          startTime: USER.startTime,
          endTime: USER.endTime,
        },
        { headers: { Authorization: Token } }
      );
      return Data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const ReservationSlice = createSlice({
  name: "Reservation",
  initialState: {
    loading: false,
    errors: [],
    availableTable: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HandleCheckTable.pending, (State, Action) => {
      State.loading = true;
    });
    builder.addCase(HandleCheckTable.rejected, (State, Action) => {
      State.loading = false;
      if (Action.payload.Data !== undefined) State.errors = Action.payload.Data;
    });
    builder.addCase(HandleCheckTable.fulfilled, (State, Action) => {
      State.loading = false;
      State.errors = {};
      State.availableTable = true;
    });
  },
});

export const {} = ReservationSlice.actions;

export default ReservationSlice.reducer;
