import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/toast";

import {
  IVaccineState,
  Vaccine,
  VaccineResponse,
  VaccinesResponse,
} from "../../types/vaccine";

const toast = createStandaloneToast();

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
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const fetchVaccine = createAsyncThunk(
  "vaccine/single",
  async (vaccine_id: number, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<VaccineResponse>(
        `${process.env.REACT_APP_SERVER_URL}/api/vaccine/${vaccine_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const createVaccine = createAsyncThunk(
  "vaccine/create",
  async (vaccine: Vaccine, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post<VaccineResponse>(
        `${process.env.REACT_APP_SERVER_URL}/api/vaccine`,
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
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const editVaccine = createAsyncThunk(
  "vaccine/edit",
  async (vaccine: Vaccine, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put<VaccineResponse>(
        `${process.env.REACT_APP_SERVER_URL}/api/vaccine/${vaccine.id}`,
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
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const deleteVaccine = createAsyncThunk(
  "vaccine/delete",
  async (vaccine_id: number, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete<VaccineResponse>(
        `${process.env.REACT_APP_SERVER_URL}/api/vaccine/${vaccine_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      response.data.vaccine_id = vaccine_id;
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message
      );
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

  creating: false,
  createError: "",

  editing: false,
  editError: "",

  deleting: false,
  deleteError: "",
};

export const vaccineSlice = createSlice({
  name: "vaccine",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchVaccines.pending, (state, action) => {
        state.vaccinesLoading = true;
        state.vaccinesError = "";
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
        state.vaccineError = "";
        state.editError = "";
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
      })

      .addCase(createVaccine.pending, (state, action) => {
        state.creating = true;
        state.createError = "";
      })
      .addCase(
        createVaccine.fulfilled,
        (state, action: PayloadAction<VaccineResponse>) => {
          state.creating = false;

          toast.toast({
            title: "Vaccine Created successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .addCase(createVaccine.rejected, (state, action: PayloadAction<any>) => {
        state.creating = false;
        state.createError = action.payload;
      })

      .addCase(editVaccine.pending, (state, action) => {
        state.editing = true;
        state.editError = "";
      })
      .addCase(
        editVaccine.fulfilled,
        (state, action: PayloadAction<VaccineResponse>) => {
          state.editing = false;

          toast.toast({
            title: "Vaccine edited successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .addCase(editVaccine.rejected, (state, action: PayloadAction<any>) => {
        state.editing = false;
        state.editError = action.payload;
      })

      .addCase(deleteVaccine.pending, (state, action) => {
        state.deleting = true;
        state.deleteError = "";
      })
      .addCase(
        deleteVaccine.fulfilled,
        (state, action: PayloadAction<VaccineResponse>) => {
          state.deleting = false;
          state.vaccines = state.vaccines.filter((v) => {
            return !(v.id === action.payload.vaccine_id);
          });

          toast.toast({
            title: "Vaccine deleted successfully",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .addCase(deleteVaccine.rejected, (state, action: PayloadAction<any>) => {
        state.deleting = false;
        state.deleteError = action.payload;
      });
  },
});
// export const {} = userSlice.actions;

// export const selectCount = (state: RootState) => state.auth.user;

export default vaccineSlice.reducer;
