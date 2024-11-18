import mongoose from "mongoose";

const User_Model = mongoose.Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Token: { type: String, required: true },
    Role: { type: String, enum: ["ADMIN", "USER", "MANAGER"], default: "USER" },
    Avatar: {
      type: String,
      default: `${process.env.ServerHost}/Uploads/Avatar.jpg`,
    },
    Gender: { type: String, enum: ["Male", "Female"], required: true },
    Address: {
      location: { type: String, default: "" },
      ZipCode: { type: Number, default: "" },
      City: { type: String, default: "" },
    },
    Mobile: { type: String, required: true },
    Verified: { type: Boolean, default: false },
  },
  { collection: "Users", timestamps: true }
);

export default mongoose.model("User_Model", User_Model);
