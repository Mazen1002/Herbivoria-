// import schema from user modle
import Users_Model from "../Models/Users_Model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Codes from "../Utils/Codes.js";
import JWT from "../Utils/JWT.js";

// login user authentication
const User_Login = async (Req, Res) => {
  const { email, password } = Req.body;
  // Body Validation Before Searching in the database to increase performance
  const Errors = validationResult(Req);
  if (!Errors.isEmpty()) {
    const NewErrors = Object.fromEntries(
      Errors.array().map((arr) => [arr.path, arr.msg])
    );
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't login please Try again later",
      Data: NewErrors,
    });
  }
  try {
    // Searching in the database with email may be email is wrong
    const USER = await Users_Model.findOne({ email });
    if (USER == null) {
      // invalid data in the body and not match the data in the database
      return Res.status(Codes.FAILD_CODE).json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "Email is not exist !",
      });
    } else {
      const UserPassword = bcrypt.compare(password, USER.password);
      if (USER && UserPassword) {
        // return ther user data
        return Res.status(Codes.SUCCESS_CODE).json({
          Status: Codes.SUCCESS,
          Status_Code: Codes.SUCCESS_CODE,
          Data: await Users_Model.findOne(
            { email },
            { password: 0, __v: 0, Role: 0 }
          ),
        });
      } else {
        // here found email but the password does not match
        return Res.status(Codes.FAILD_CODE).json({
          Status: Codes.FAILD,
          Status_Code: Codes.FAILD_CODE,
          message: "Password is wrong ! ",
        });
      }
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

// Get Specific User from database
const Get_Specific_User = async (Req, Res) => {
  const User_id = Req.params.User_id;
  const { _id, Token } = Req.body;

  const Errors = validationResult(Req);
  // Body Validation Before Searching in the database to increase performance
  if (!Errors.isEmpty()) {
    return Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't get data please Try again later",
      data: Errors.array().map((arr) => arr.msg),
    });
  }

  try {
    // GEt user Data From the Data Base
    const USER = await Users_Model.findOne(
      { _id, Token },
      { password: 0, __v: 0, Role: 0 }
    );
    if (User_id === _id && USER !== null) {
      // return ther user data
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        Data: USER,
      });
    } else {
      const User = await Users_Model.findOne(
        { _id: User_id },
        { name: 1, email: 1, Mobile: 1, Avatar: 1 }
      );
      return Res.json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        Data: User,
      });
    }
  } catch (err) {
    Res.json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "User not founded",
    });
  }
};

// register user authentication and store him into database
const User_Register = async (Req, Res) => {
  const { FirstName, LastName, email, password, Mobile, Gender } = Req.body;
  const Errors = validationResult(Req);
  // Body Validation Before Searching in the database to increase performance
  if (!Errors.isEmpty()) {
    const NewErrors = Object.fromEntries(
      Errors.array().map((arr) => [arr.path, arr.msg])
    );
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Can't Register please Try again later",
      data: NewErrors,
    });
  }
  try {
    // Searching in the database to find if the user is exist
    const Check_User = await Users_Model.findOne({ email });
    if (Check_User) {
      return Res.status(Codes.FAILD_CODE).json({
        Status: Codes.FAILD,
        Status_Code: Codes.FAILD_CODE,
        message: "User Is already exist",
      });
    } else {
      const HashPassword = await bcrypt.hash(
        password,
        +process.env.HASH_PASSWORD
      );
      const NewUser = new Users_Model({
        FirstName: FirstName,
        LastName: LastName,
        email: email,
        Role: "USER",
        password: HashPassword,
        Mobile: Mobile,
        Gender: Gender,
      });

      NewUser.Token = await JWT.Genetate_Token(NewUser);

      await NewUser.save();

      // return user data after saving it in the database
      return Res.status(Codes.SUCCESS_CODE).json({
        Status: Codes.SUCCESS,
        Status_Code: Codes.SUCCESS_CODE,
        message: "User Created Successfully",
      });
    }
  } catch (err) {
    // Error in Saving handelar
    return Res.status(Codes.FAILD_CODE).json({
      Status: Codes.FAILD,
      Status_Code: Codes.FAILD_CODE,
      message: "Sorry Something went wrong please try again later !",
    });
  }
};

export default {
  User_Login,
  Get_Specific_User,
  User_Register,
};
