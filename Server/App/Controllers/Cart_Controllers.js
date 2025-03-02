// import files
import { validationResult } from "express-validator";
import Cart_Model from "../Models/Cart_Model.js";
import Codes from "../utils/Codes.js";
import mongoose from "mongoose";

// Get all products in Cart
const Get_All = async (Req, Res) => {
  const { User_Id } = Req.body;

  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    const NewErrors = Object.fromEntries(
      Errors.array().map((arr) => [arr.path, arr.msg])
    );
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't get All products please Try again later",
      Data: NewErrors,
    });
  }

  try {
    // GEt all products in cart  From the Data Base
    const Cart = await Cart_Model.aggregate([
      {
        $match: {
          User_Id: new mongoose.Types.ObjectId(User_Id),
        },
      },
      {
        $lookup: {
          from: "Menu",
          localField: "Product_ID",
          foreignField: "_id",
          as: "Product",
        },
      },
      { $unwind: "$Product" },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$Product", { Count: "$Count" }],
          },
        },
      },
    ]);

    Res.status(Codes.SUCCESS_CODE).json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      Data: Cart,
    });
  } catch (err) {
    Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "something happens wrong",
    });
  }
};

// Add Single products To Cart
const Add_To_Cart = async (Req, Res) => {
  const { User_Id, Product_ID } = Req.body;
  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    const NewErrors = Object.fromEntries(
      Errors.array().map((arr) => [arr.path, arr.msg])
    );
    return Res.Status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Add to cart please Try again later",
      Data: NewErrors,
    });
  }

  try {
    // GEt Single products From the Data Base
    const Product = await Cart_Model.findOne({ User_Id, Product_ID });

    if (Product === null) {
      const AddItem = new Cart_Model({ User_Id, Product_ID });
      await AddItem.save();
      Res.status(Codes.SUCCESS_CODE).json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "product added !",
      });
    } else {
      Res.status(Codes.FAILD_CODE).json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "product already added !",
      });
    }
  } catch (err) {
    Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "product can't be added !",
    });
  }
};

// Delete Single products From Cart
const Delete_from_Cart = async (Req, Res) => {
  const { User_Id, Product_ID } = Req.body;
  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    const NewErrors = Object.fromEntries(
      Errors.array().map((arr) => [arr.path, arr.msg])
    );
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Delete please Try again later",
      Data: NewErrors,
    });
  }

  try {
    // GEt Single products From the Data Base
    const Product = await Cart_Model.findOne({ User_Id, Product_ID });

    if (Product !== null) {
      await Cart_Model.deleteOne({ User_Id, Product_ID });
      Res.status(Codes.SUCCESS_CODE).json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "product Deleted !",
      });
    } else {
      Res.status(Codes.FAILD_CODE).json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "You want delete item not Founded in Cart !",
      });
    }
  } catch (err) {
    Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "product can't be Deleted !",
    });
  }
};

// update count
const Update_Count = async (Req, Res) => {
  const type = Req.query.type == "ADD" ? 1 : -1;
  const { User_Id, Product_ID } = Req.body;
  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    const NewErrors = Object.fromEntries(
      Errors.array().map((arr) => [arr.path, arr.msg])
    );
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't update please Try again later",
      Data: NewErrors,
    });
  }
  try {
    const Find_Product = await Cart_Model.findOne({ User_Id, Product_ID });
    if ((Find_Product.Count >= 1 && type == 1) || Find_Product.Count > 1) {
      await Cart_Model.updateOne(
        { User_Id, Product_ID },
        { $inc: { Count: type } }
      );
    } else {
      await Cart_Model.updateOne({ User_Id, Product_ID }, { Count: 1 });
    }
    Res.status(Codes.SUCCESS_CODE).json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      message: "product updated !",
      Data: Find_Product,
    });
  } catch (err) {
    Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "product can't be updated !",
    });
  }
};

export default {
  Add_To_Cart,
  Get_All,
  Delete_from_Cart,
  Update_Count,
};
