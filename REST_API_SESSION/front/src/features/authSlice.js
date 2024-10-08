import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: user.email,
        password: user.password,
      });
      return res.data;
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message || "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const res = await axios.get("http://localhost:5000/me");
    return res.data;
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message || "Something went wrong";
    return thunkAPI.rejectWithValue(message);
  }
});

export const Logout = createAsyncThunk("user/Logout", async (_, thunkAPI) => {
  await axios.delete("http://localhost:5000/logout");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // untuk login
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      // console.log("Login failed:", action.payload);
    });

    // untuk get Me / Get user login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
