// import files
import express from "express";
import { body } from "express-validator";
import Menu_Controllers from "../Controllers/Menu_Controllers.js";
import JWT from "../Utils/JWT.js";

const Router = express.Router();

// Routes Handelar /API/Menu
Router.route("/").post(
  JWT.Verify_Token,
  [
    body("_id").notEmpty().withMessage("_id is not Valid"),
    body("Calories"),
    body("Type"),
    body("Price"),
    body("Spicy"),
  ],
  Menu_Controllers.Get_Menu
);

// Routes Handelar /API/Menu/Filter
Router.route("/Filter/:Filter").post(
  JWT.Verify_Token,
  [body("_id").notEmpty().withMessage("_id is not Valid")],
  Menu_Controllers.Get_Menu_Spectial
);

// Routes Handelar /API/Menu/_id
Router.route("/:_id").post(
  JWT.Verify_Token,
  [body("_id").notEmpty().withMessage("_id is not Valid")],
  Menu_Controllers.Get_Menu_Product
);

export default Router;
