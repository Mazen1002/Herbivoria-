import { validationResult } from "express-validator";
import Reservation_Model from "../Models/Reservation_Model.js";
import Codes from "../utils/Codes.js";
import { sendReservationConfirmation } from "../Utils/SendEmail.js";

const TOTAL_TABLES = 10;

const isOverlapping = (newStart, newEnd, existingStart, existingEnd) => {
  return (
    (newStart >= existingStart && newStart < existingEnd) ||
    (newEnd > existingStart && newEnd <= existingEnd) ||
    (newStart <= existingStart && newEnd >= existingEnd)
  );
};

const isFutureOrToday = (inputDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateToCheck = new Date(inputDate);
  dateToCheck.setHours(0, 0, 0, 0);
  return dateToCheck >= today;
};

const isEndTimeGreaterThanStartTime = (startTime, endTime) => {
  return (
    new Date(`1970-01-01T${endTime}`) > new Date(`1970-01-01T${startTime}`)
  );
};

// Check if tables are available
const CheckTable = async (Req, Res) => {
  const { date, startTime, endTime } = Req.body;

  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    const NewErrors = Object.fromEntries(
      Errors.array().map((arr) => [arr.path, arr.msg])
    );
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Invalid input data",
      Data: NewErrors,
    });
  }

  // Check if the requested date is valid (today or future)
  if (!isFutureOrToday(date)) {
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "The reservation date must be today or a future date.",
    });
  }

  // Check if endTime is greater than startTime
  if (!isEndTimeGreaterThanStartTime(startTime, endTime)) {
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Leaving time must be greater than comming time.",
    });
  }

  try {
    const reservations = await Reservation_Model.find({ date });
    const conflictingReservations = reservations.filter((res) =>
      isOverlapping(startTime, endTime, res.startTime, res.endTime)
    );
    const availableTables = TOTAL_TABLES - conflictingReservations.length;

    return Res.status(Codes.SUCCESS_CODE).json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      message:
        availableTables > 0
          ? "Available Tables"
          : "There are no available tables.",
      Data: { available: availableTables > 0, availableTables },
    });
  } catch (err) {
    console.error("Error checking table availability:", err); // Log the error
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message:
        "An error occurred while checking table availability. Please try again later.",
    });
  }
};

// Create a new reservation
const MakeReservation = async (Req, Res) => {
  const { name, email, phone, numberOfGuests, date, startTime, endTime } =
    Req.body;

  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    const NewErrors = Object.fromEntries(
      Errors.array().map((arr) => [arr.path, arr.msg])
    );
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Invalid input data",
      Data: NewErrors,
    });
  }

  // Check if the requested date is valid (today or future)
  if (!isFutureOrToday(date)) {
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "The reservation date must be today or a future date.",
    });
  }

  // Check if endTime is greater than startTime
  if (!isEndTimeGreaterThanStartTime(startTime, endTime)) {
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Leaving time must be greater than comming time.",
    });
  }

  try {
    const reservations = await Reservation_Model.find({ date });
    const conflictingReservations = reservations.filter((res) =>
      isOverlapping(startTime, endTime, res.startTime, res.endTime)
    );

    if (conflictingReservations.length >= TOTAL_TABLES) {
      return Res.status(Codes.FAILD_CODE).json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "No tables available at this time.",
      });
    }

    const newReservation = new Reservation_Model({
      name,
      email,
      phone,
      numberOfGuests,
      date,
      startTime,
      endTime,
    });

    await newReservation.save();
    await sendReservationConfirmation(
      name,
      email,
      phone,
      numberOfGuests,
      date,
      startTime,
      endTime
    );

    return Res.status(Codes.SUCCESS_CODE).json({
      Status: Codes.SUCCESS,
      Status_Code: Codes.SUCCESS_CODE,
      message: "Reservation created successfully!",
    });
  } catch (err) {
    console.error("Error creating reservation:", err); // Log the error
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message:
        "An error occurred while creating the reservation. Please try again later.",
    });
  }
};

export default {
  CheckTable,
  MakeReservation,
};
