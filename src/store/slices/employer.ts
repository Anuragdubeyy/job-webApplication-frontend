import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getAllEmployerJobPost } from "../api/employer";

export interface EmployerJob {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  category: string;
  createdAt: {
    date:  string;
  };
  updated_at: string;
}

export interface EmployerJobState {
  allEmployerJobList: EmployerJob[];
  singleEmployerJobDetail: EmployerJob;
  EmployerJobMessage: string;
  isEmployerJobLoading: boolean;
}

const initialState: EmployerJobState = {
  allEmployerJobList: [],
  singleEmployerJobDetail: {} as EmployerJob,
  EmployerJobMessage: "",
  isEmployerJobLoading: false,
};

export const getAllEmployerJobListAsync = createAsyncThunk(
  "EmployerJob/getAllEmployerJobList",
  async () => {
    const res: any = await getAllEmployerJobPost();
    return res.data;
  }
);



const EmployerJobSlice = createSlice({
  name: "EmployerJob",
  initialState,
  reducers: {
    clearEmployerJobMessage: (state) => {
      state.EmployerJobMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployerJobListAsync.fulfilled, (state, action) => {
        state.allEmployerJobList = action.payload.data;
        state.isEmployerJobLoading = false;
      })
      
  },
});

export const selectAllEmployerJobList = (state: RootState) => state.EmployerJob.allEmployerJobList;
export const selectSingleEmployerJob = (state: RootState) => state.EmployerJob.singleEmployerJobDetail;
export const selectEmployerJobMessage = (state: RootState) => state.EmployerJob.EmployerJobMessage;
export const selectEmployerJobLoading = (state: RootState) => state.EmployerJob.isEmployerJobLoading;
export const { clearEmployerJobMessage } = EmployerJobSlice.actions;
export default EmployerJobSlice.reducer;
