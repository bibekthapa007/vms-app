import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAuthState, SigninResponse } from './../../types/auth';

export const signin = createAsyncThunk(
  'auth/signin',
  async (data: { email: string; password: string }, thunkApi) => {
    try {
      const response = await axios.post<SigninResponse>(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/signin`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const { token } = response.data;
      localStorage.setItem('token', token);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (data: { email: string; password: string }, thunkApi) => {
    try {
      const response = await axios.post<SigninResponse>(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/signup`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const fetchUserData = createAsyncThunk('auth/check', async (data, thunkApi) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<SigninResponse>(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/check`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

const initialState: IAuthState = {
  user: null,
  initialLoading: true,
  isSigningIn: false,
  signinError: '',
  isSigningUp: false,
  signupError: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem('token');
      state.user = null;
      state.signinError = '';
      state.signupError = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserData.pending, (state, action) => {
        state.initialLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<SigninResponse>) => {
        state.initialLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUserData.rejected, (state, action: PayloadAction<any>) => {
        state.initialLoading = false;
        state.user = action.payload;
      })
      .addCase(signin.pending, (state, action) => {
        state.isSigningIn = true;
      })
      .addCase(signin.fulfilled, (state, action: PayloadAction<SigninResponse>) => {
        state.isSigningIn = false;
        state.user = action.payload.user;
      })
      .addCase(signin.rejected, (state, action: PayloadAction<any>) => {
        state.isSigningIn = false;
        state.signinError = action.payload;
      })
      .addCase(signup.pending, (state, action) => {
        state.isSigningUp = true;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<SigninResponse>) => {
        state.isSigningUp = false;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
        state.isSigningUp = false;
        state.signupError = action.payload;
      });
  },
});
export const { logout } = userSlice.actions;

// export const selectCount = (state: RootState) => state.auth.user;

export default userSlice.reducer;
