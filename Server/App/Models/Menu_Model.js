import mongoose from "mongoose";

const Menu_Model = mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: Number, require: true },
    LikesCount: { type: Number, require: true },
    cal: { type: Number, require: true },
    Proteins: { type: Number, require: true },
    Fats: { type: Number, require: true },
    img: { type: String, require: true },
    Details: { type: String, require: true },
    type: {
      type: String,
      enum: ["Burger", "Pizza", "Meal", "Drink", "Dish"],
      require: true,
    },
    Spicy: { type: Boolean, require: true },
    kids: { type: Boolean, require: true },
  },
  { collection: "Menu", timestamps: true }
);

export default mongoose.model("Menu_Model", Menu_Model);
