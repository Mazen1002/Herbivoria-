// import files
import express from "express";
import Reservation_Controllers from "../Controllers/Reservation_Controllers.js";
import { body } from "express-validator";
import JWT from "./../Utils/JWT.js";

const Router = express.Router();

// Custom Regex Patterns
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^\d{10,15}$/;
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Route to Check Availability
Router.route("/Check").post(
  JWT.Verify_Token,
  [
    body("name")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long."),
    body("email").matches(emailRegex).withMessage("Invalid email format."),
    body("phone")
      .matches(phoneRegex)
      .withMessage("Phone number must be 10-15 digits."),
    body("numberOfGuests")
      .isInt({ min: 1 })
      .withMessage("Number of guests must be a positive integer."),
    body("date").notEmpty().withMessage("Date must be in YYYY-MM-DD format."),
    body("startTime")
      .matches(timeRegex)
      .withMessage("comming time must be in HH:mm format."),
    body("endTime")
      .matches(timeRegex)
      .withMessage("Leaving time must be in HH:mm format."),
  ],
  Reservation_Controllers.CheckTable
);

// Route to Make a Reservation
Router.route("/Make").post(
  JWT.Verify_Token,
  [
    body("name")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long."),
    body("email").matches(emailRegex).withMessage("Invalid email format."),
    body("phone")
      .matches(phoneRegex)
      .withMessage("Phone number must be 10-15 digits."),
    body("numberOfGuests")
      .isInt({ min: 1 })
      .withMessage("Number of guests must be a positive integer."),
    body("date").notEmpty().withMessage("Date must be in YYYY-MM-DD format."),
    body("startTime")
      .matches(timeRegex)
      .withMessage("Start time must be in HH:mm format."),
    body("endTime")
      .matches(timeRegex)
      .withMessage("End time must be in HH:mm format."),
  ],
  Reservation_Controllers.MakeReservation
);

export default Router;
