import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./Slices/RegisterSlice";
import UserSlice from "./Slices/UserSlice";
import MenuSlice from "./Slices/MenuSlice";
import DishesSLice from "./Slices/DishesSLice";
import CartSlice from "./Slices/CartSlice";
import ReservationSlice from "./Slices/ReservationSlice";

const Store = configureStore({
  reducer: {
    User: UserSlice,
    Register: RegisterSlice,
    Menu: MenuSlice,
    Dishes: DishesSLice,
    Cart: CartSlice,
    Reservation: ReservationSlice,
  },
});

export default Store;
