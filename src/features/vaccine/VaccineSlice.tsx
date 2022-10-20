import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  IVaccineState,
  Vaccine,
  VaccineResponse,
  VaccinesResponse,
} from "../../types/vaccine";

export const fetchVaccines = createAsyncThunk(
  "vaccine/list",
  async (data, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<VaccinesResponse>(
        `${process.env.REACT_APP_SERVER_URL}/api/vaccine/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchVaccine = createAsyncThunk(
  "vaccine/single",
  async (vaccine_id: number, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<VaccineResponse>(
        `${process.env.REACT_APP_SERVER_URL}/api/vaccine/${vaccine_id}}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createVaccine = createAsyncThunk(
  "vaccine/create",
  async (vaccine: Vaccine, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post<VaccinesResponse>(
        `${process.env.REACT_APP_SERVER_URL}/api/vaccine/create`,
        vaccine,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateVaccine = createAsyncThunk(
  "vaccine/update",
  async (vaccine: Vaccine, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post<VaccinesResponse>(
        `${process.env.REACT_APP_SERVER_URL}/api/vaccine/update/${vaccine.id}`,
        vaccine,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteVaccine = createAsyncThunk(
  "vaccine/delete",
  async (vaccine_id: number, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete<VaccinesResponse>(
        `${process.env.REACT_APP_SERVER_URL}/api/vaccine/delete/${vaccine_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState: IVaccineState = {
  vaccines: [],
  vaccinesLoading: false,
  vaccinesError: "",
  vaccine: null,
  vaccineLoading: false,
  vaccineError: "",

  deleting: true,
  deleteError: "",

  creating: true,
  createError: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchVaccines.pending, (state, action) => {
        state.vaccinesLoading = true;
      })
      .addCase(
        fetchVaccines.fulfilled,
        (state, action: PayloadAction<VaccinesResponse>) => {
          state.vaccinesLoading = false;
          state.vaccines = action.payload.vaccines;
        }
      )
      .addCase(fetchVaccines.rejected, (state, action: PayloadAction<any>) => {
        state.vaccinesLoading = false;
        state.vaccinesError = action.payload;
      })

      .addCase(fetchVaccine.pending, (state, action) => {
        state.vaccineLoading = true;
      })
      .addCase(
        fetchVaccine.fulfilled,
        (state, action: PayloadAction<VaccineResponse>) => {
          state.vaccineLoading = false;
          state.vaccine = action.payload.vaccine;
        }
      )
      .addCase(fetchVaccine.rejected, (state, action: PayloadAction<any>) => {
        state.vaccinesLoading = false;
        state.vaccinesError = action.payload;
      });
  },
});
export const {} = userSlice.actions;

// export const selectCount = (state: RootState) => state.auth.user;

export default userSlice.reducer;
