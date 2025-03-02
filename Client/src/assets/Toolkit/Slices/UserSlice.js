import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast_Handelar from "./../../Components/Toast_Handelar";

export const Login_Thunk = createAsyncThunk(
  "User/Login",
  async (USER, { rejectWithValue }) => {
    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API_URL}/Users/Login`,
        {
          email: USER.email,
          password: USER.password,
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

export const Login_Local_Thunk = createAsyncThunk(
  "User/Login_Local",
  async (arg, { getState }) => {
    const State = getState();
    const { Token: TOKEN, _id: _ID } = State.User.RememberMe
      ? JSON.parse(localStorage.getItem("Token"))
      : JSON.parse(sessionStorage.getItem("Token"));

    const Data = await axios.post(
      `${process.env.REACT_APP_API_URL}/Users/${_ID}`,
      { _id: _ID, Token: TOKEN },
      {
        headers: {
          Authorization: TOKEN,
        },
      }
    );
    return Data.data;
  }
);

export const Change_User_Avatar = createAsyncThunk(
  "Change_User_Avatar",
  async (ImageFile) => {
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/Users/Setting/Upload_Avatar`,
          {
            _id: _id,
            Token: Token,
            Avatar: ImageFile,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: Token,
            },
          }
        )
        .then((res) => {
          if (res.data.Status === "Faild") {
            Toast_Handelar("error", res.data.message);
          } else {
            Toast_Handelar("success", res.data.message);
          }
        });
    } catch (err) {
      Toast_Handelar("error", "Something happens wrong !");
    }
  }
);

export const UpdateUserChanges = createAsyncThunk(
  "UpdateUserChanges",
  async (USER) => {
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));
    try {
      const Data = await axios.post(
        `${process.env.REACT_APP_API_URL}/Users/Setting/Upload_Changes`,
        {
          _id: _id,
          Token: Token,
          email: USER.email,
          Mobile: USER.Mobile,
          LastName: USER.LastName,
          FirstName: USER.FirstName,
          City: USER.Address?.City,
          ZipCode: USER.Address?.ZipCode,
          location: USER.Address?.location,
        },
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      return Data.data;
    } catch (err) {
      Toast_Handelar("error", "Something happens wrong !");
    }
  }
);

export const UpdateUserPassword = createAsyncThunk(
  "UpdateUserPassword",
  async (payload) => {
    const { Token, _id } = JSON.parse(localStorage.getItem("Token"));
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/Users/Setting/Change_Password`,
          {
            _id: _id,
            Token: Token,
            NewPassword: payload.NewPassword,
            password: payload.password,
          },
          {
            headers: {
              Authorization: Token,
            },
          }
        )
        .then((res) => {
          if (res.data.Status === "Faild") {
            Toast_Handelar("error", res.data.message);
          } else {
            Toast_Handelar("success", res.data.message);
          }
        });
    } catch (err) {
      Toast_Handelar("error", "Something happens wrong !");
    }
  }
);

const UserSlice = createSlice({
  name: "User",
  initialState: {
    Errors: {},
    user: {},
    loading: false,
    Token: "",
    IsLogin: false,
    RememberMe: false,
    changeAvatar: {
      status: false,
      path: "",
    },
    UpdateErrors: [],
  },
  reducers: {
    Handle_RemmberMe: (State, action) => {
      State.RememberMe = !State.RememberMe;
    },
    Login_Local: (State, action) => {
      const CheckLogin = JSON.parse(localStorage.getItem("Herbivoria-login"));
      const sessionLogin = JSON.parse(
        sessionStorage.getItem("Herbivoria-login")
      );
      if (CheckLogin !== null) {
        State.IsLogin = true;
        State.RememberMe = true;
        return;
      } else {
        State.IsLogin = false;
        State.RememberMe = false;
        if (sessionLogin !== null) {
          State.IsLogin = true;
          State.RememberMe = false;
        } else {
          State.IsLogin = false;
          State.RememberMe = false;
        }
      }
    },
    Handle_Logout: (State, action) => {
      State.IsLogin = false;
      State.RememberMe = false;
      State.user = {};
      State.Token = "";
      sessionStorage.clear();
      localStorage.clear();
      State.Errors = {};
    },
    ChangeStatus: (State, action) => {
      State.changeAvatar.status = action.payload;
    },
    HandleChandeAvatar: (State, action) => {
      if (State.changeAvatar.status) {
        State.changeAvatar.path = action.payload;
      } else {
        State.user.Avatar = action.payload;
      }
    },
    UpdateLocalData: (State, action) => {
      State.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Login_Thunk.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(Login_Local_Thunk.pending, (State, action) => {
      State.loading = true;
    });
    builder.addCase(Login_Thunk.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload.Status !== "Faild") {
        State.IsLogin = true;
        State.user = action.payload.Data;
        State.Token = action.payload.Data.Token;
        if (State.RememberMe) {
          localStorage.setItem("Herbivoria-login", JSON.stringify(true));
          localStorage.setItem(
            "Token",
            JSON.stringify({
              Token: action.payload.Data.Token,
              _id: action.payload.Data._id,
            })
          );
        } else {
          sessionStorage.setItem("Herbivoria-login", JSON.stringify(true));
          sessionStorage.setItem(
            "Token",
            JSON.stringify({
              Token: action.payload.Data.Token,
              _id: action.payload.Data._id,
            })
          );
        }
      } else {
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(Login_Local_Thunk.fulfilled, (State, action) => {
      State.loading = false;
      if (action.payload.Status !== "Faild") {
        State.IsLogin = true;
        State.user = action.payload.Data;
        State.Token = action.payload.Data.Token;
      } else {
        State.IsLogin = false;
        localStorage.clear();
        Toast_Handelar("error", action.payload.message);
      }
    });
    builder.addCase(Login_Thunk.rejected, (State, action) => {
      State.loading = false;
      State.Errors = action.payload.Data;
    });
    builder.addCase(Login_Local_Thunk.rejected, (State, action) => {
      State.loading = true;
    });
    builder.addCase(UpdateUserChanges.fulfilled, (State, action) => {
      if (action.payload.Status === "Faild") {
        State.UpdateErrors = action.payload.data;
        Toast_Handelar("error", action.payload.message);
      } else {
        Toast_Handelar("success", action.payload.message);
        State.UpdateErrors = [];
      }
    });
  },
});

export const {
  Login_Local,
  Handle_RemmberMe,
  Handle_Logout,
  ChangeStatus,
  HandleChandeAvatar,
  UpdateLocalData,
} = UserSlice.actions;

export default UserSlice.reducer;
