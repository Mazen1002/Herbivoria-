import mongoose from "mongoose";

const Reservation_Model = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    numberOfGuests: { type: Number, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { collection: "Reservation", timestamps: true }
);

export default mongoose.model("Reservation_Model", Reservation_Model);
