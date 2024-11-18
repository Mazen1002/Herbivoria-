// import files
import express from "express";
import { body } from "express-validator";
import Users_Controllers from "../Controllers/Users_Controllers.js";
import JWT from "../Utils/JWT.js";

const Router = express.Router();

// Routes Handelar /API/Users/Login
Router.route("/Login").post(
  [
    body("email")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)
      .withMessage("Email is not Valid"),
    body("password")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      .withMessage("Password is not Valid"),
  ],
  Users_Controllers.User_Login
);

// Routes Handelar /API/Users/Register
Router.route("/Register").post(
  [
    body("FirstName").notEmpty().withMessage("First Name is Required"),
    body("LastName").notEmpty().withMessage("Last Name is Required"),
    body("Mobile").notEmpty().withMessage("Mobile is not Valid"),
    body("Gender").notEmpty().withMessage("Gender is not Valid"),
    body("email")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)
      .withMessage("Email is not Valid"),
    body("password")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
      .withMessage("Password is not Valid"),
  ],
  Users_Controllers.User_Register
);

// Routes Handelar /API/Users/ID
Router.route("/:User_id").post(
  JWT.Verify_Token,
  [
    body("_id").notEmpty().withMessage("_id is not Valid"),
    body("Token").notEmpty().withMessage("Token is not Valid"),
  ],
  Users_Controllers.Get_Specific_User
);

export default Router;
