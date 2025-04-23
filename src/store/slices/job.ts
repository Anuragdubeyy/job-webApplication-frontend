import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllJobAppliedByUserList, getAllJobList, getSingleJob } from "../api/jobseeker";
import { RootState } from "..";

export interface Job {
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

export interface jobState {
  allJobList: Job[];
  singleJobDetail: Job;
  allAppliedJobList: Job[];
  jobMessage: string;
  isJobLoading: boolean;
  isAppliedjobLoading:boolean;
}

const initialState: jobState = {
  allJobList: [],
  singleJobDetail: {} as Job,
  allAppliedJobList: [] ,
  jobMessage: "",
  isJobLoading: false,
  isAppliedjobLoading:false,
};

export const getAllJobListAsync = createAsyncThunk(
  "job/getAllJobList",
  async () => {
    const res: any = await getAllJobList();
    return res.data;
  }
);

export const getSingleJobAsync = createAsyncThunk(
  "job/getSingleJob",
  async (id: string) => {
    const res: any = await getSingleJob(id);
    return res.data;
  }
);

export const getAllJobAppliedByUserAsync = createAsyncThunk(
  "job/getAllJobAppliedByUser",
  async () => {
    const res: any = await getAllJobAppliedByUserList();
    return res.data;
  }
);

const JobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    clearJobMessage: (state) => {
      state.jobMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobListAsync.fulfilled, (state, action) => {
        state.allJobList = action.payload.data;
        state.isJobLoading = false;
      })
      .addCase(getSingleJobAsync.pending, (state) => {
        state.isJobLoading = true;
      })

      .addCase(getSingleJobAsync.fulfilled, (state, action) => {
        state.singleJobDetail = action.payload.data;
        state.isJobLoading = false;
      })
      .addCase(getSingleJobAsync.rejected, (state, action) => {
        state.isJobLoading = false;
        state.jobMessage = action.error.message || "Something went wrong";
      })
      .addCase(getAllJobAppliedByUserAsync.fulfilled, (state, action) => {
        state.allAppliedJobList = action.payload.data;
        state.isAppliedjobLoading = false;
      })
  },
});

export const selectAllJobList = (state: RootState) => state.job.allJobList;
export const selectSingleJob = (state: RootState) => state.job.singleJobDetail;
export const selectAllJobAppliedList = (state: RootState) => state.job.allAppliedJobList;
export const selectJobMessage = (state: RootState) => state.job.jobMessage;
export const selectJobLoading = (state: RootState) => state.job.isJobLoading;
export const { clearJobMessage } = JobSlice.actions;
export default JobSlice.reducer;
