// import schema from user modle
import Users_Model from "../Models/Users_Model.js";
import Menu_Model from "../Models/Menu_Model.js";
import Cart_Model from "../Models/Cart_Model.js";
import { validationResult } from "express-validator";
import Codes from "../Utils/Codes.js";
import mongoose from "mongoose";

// Get all products for user
const Get_Menu = async (Req, Res) => {
  const { _id, Calories, Type, Price, Spicy } = Req.body;
  const Page = +Req.query.Page || 1;
  const Limit = +Req.query.Limit || 10;
  const Skip = (Page - 1) * Limit;

  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    const NewErrors = Object.fromEntries(
      Errors.array().map((arr) => [arr.path, arr.msg])
    );
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Get Data please Try again later",
      Data: NewErrors,
    });
  }
  try {
    // Searching in the database with email may be email is wrong
    const USER = await Users_Model.findOne({ _id: _id });
    if (USER == null) {
      // invalid data in the body and not match the data in the database
      return Res.status(Codes.FAILD_CODE).json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "User is not exist !",
      });
    } else {
      const Cart = await Cart_Model.find({ User_Id: _id });
      let CartProductsID = new Array();
      await Cart.map((ele) => CartProductsID.push(ele.Product_ID));

      let MenuProducts = await Menu_Model.aggregate([
        { $match: Type !== "" ? { type: Type } : {} },
        { $match: { cal: { $gte: +Calories[0], $lte: +Calories[1] } } },
        { $match: { price: { $gte: +Price[0], $lte: +Price[1] } } },
        { $match: Spicy !== "" ? { Spicy: Spicy } : {} },
        {
          $facet: {
            meta: [
              { $count: "Total" },
              {
                $addFields: {
                  PageNumber: Page,
                  TotalPages: { $ceil: { $divide: ["$Total", Limit] } },
                },
              },
            ],
            data: [
              { $skip: Skip },
              { $limit: Limit },
              {
                $addFields: {
                  IsinCart: { $in: ["$_id", CartProductsID] },
                },
              },
            ],
          },
        },
      ]);

      MenuProducts = MenuProducts[0];
      MenuProducts.meta = {
        ...MenuProducts.meta[0],
        Count: MenuProducts.data.length,
      };

      return Res.status(Codes.SUCCESS_CODE).json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Menu data Returned !",
        data: MenuProducts,
      });
    }
  } catch (err) {
    // Error in serching handelar
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// Get single products for user
const Get_Menu_Product = async (Req, Res) => {
  const { _id } = Req.body;
  const Product_id = Req.params._id;

  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    const NewErrors = Object.fromEntries(
      Errors.array().map((arr) => [arr.path, arr.msg])
    );
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Get Data please Try again later",
      Data: NewErrors,
    });
  }
  try {
    // Searching in the database with email may be email is wrong
    const USER = await Users_Model.findOne({ _id: _id });
    if (USER == null) {
      // invalid data in the body and not match the data in the database
      return Res.status(Codes.FAILD_CODE).json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "User is not exist !",
      });
    } else {
      const Cart = await Cart_Model.find({ User_Id: _id });
      let CartProductsID = new Array();
      await Cart.map((ele) => CartProductsID.push(ele.Product_ID));

      let MenuProducts = await Menu_Model.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(Product_id) } },
        {
          $addFields: {
            IsinCart: { $in: ["$_id", CartProductsID] },
          },
        },
      ]);

      return Res.status(Codes.SUCCESS_CODE).json({
        Status: Codes.FAILD,
        Status_Code: Codes.SUCCESS_CODE,
        message: "single Product data Returned !",
        data: MenuProducts[0],
      });
    }
  } catch (err) {
    // Error in serching handelar
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

// Get dishes products for user
const Get_Menu_Spectial = async (Req, Res) => {
  const { _id } = Req.body;
  const Page = +Req.query.Page || 1;
  const Limit = +Req.query.Limit || 10;
  const Skip = (Page - 1) * Limit;
  const Filter = Req.params.Filter;

  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    const NewErrors = Object.fromEntries(
      Errors.array().map((arr) => [arr.path, arr.msg])
    );
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Get Data please Try again later",
      Data: NewErrors,
    });
  }
  try {
    // Searching in the database with email may be email is wrong
    const USER = await Users_Model.findOne({ _id: _id });
    if (USER == null) {
      // invalid data in the body and not match the data in the database
      return Res.status(Codes.FAILD_CODE).json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "User is not exist !",
      });
    } else {
      const Cart = await Cart_Model.find({ User_Id: _id });
      let CartProductsID = new Array();
      await Cart.map((ele) => CartProductsID.push(ele.Product_ID));

      let MenuProducts = await Menu_Model.aggregate([
        { $match: Filter ? { type: Filter } : {} },
        {
          $facet: {
            meta: [
              { $count: "Total" },
              {
                $addFields: {
                  PageNumber: Page,
                  TotalPages: { $ceil: { $divide: ["$Total", Limit] } },
                },
              },
            ],
            data: [
              { $skip: Skip },
              { $limit: Limit },
              {
                $addFields: {
                  IsinCart: { $in: ["$_id", CartProductsID] },
                },
              },
            ],
          },
        },
      ]);

      MenuProducts = MenuProducts[0];
      MenuProducts.meta = {
        ...MenuProducts.meta[0],
        Count: MenuProducts.data.length,
      };

      return Res.status(Codes.SUCCESS_CODE).json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "Menu data Returned !",
        data: MenuProducts,
      });
    }
  } catch (err) {
    // Error in serching handelar
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

export default {
  Get_Menu,
  Get_Menu_Product,
  Get_Menu_Spectial,
};
