import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getAllEmployerJobPost, getAllJobApplicantList } from "../api/employer";

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
export interface JobApplicant {
  _id: string;
  applicant: {
    _id: string;
    name: string;
    email: string;
    mobile: string;
  };
  name: string;
  experience_year: number;
  currently_working: boolean;
  notice_period: string;
  linkedIn_link: string;
  portfolio: string;
  experience: {
    company_name: string;
    job_title: string;
    joining_date: string;
    end_date: string;
    currently_working: boolean;
    description: string;
    city: string;
    _id: string;
  }[];
  current_salary: string;
  expected_salary: string;
  resume: string;
  coverLetter: string;
  skills: string[];
  status: string;
  education: {
    degree?: string;
    institution?: string;
    start_date?: string;
    end_date?: string;
    grade?: string;
  }[];
  appliedAt: string;
}

export interface EmployerJobState {
  allEmployerJobList: EmployerJob[];
  allJobApplicantList: JobApplicant[];
  isJobApplicantLoading: boolean;
  jobApplicantMessage: string;
  singleEmployerJobDetail: EmployerJob;
  EmployerJobMessage: string;
  isEmployerJobLoading: boolean;
}

const initialState: EmployerJobState = {
  allEmployerJobList: [],
  allJobApplicantList: [],
  isJobApplicantLoading: false,
  jobApplicantMessage: "",
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
export const getAllJobApplicantListAsync = createAsyncThunk(
  "EmployerJob/getAllJobApplicantList",
  async () => {
    const res: any = await getAllJobApplicantList();
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
      .addCase(getAllJobApplicantListAsync.fulfilled, (state, action) => {
        state.allJobApplicantList = action.payload.data;
        state.isJobApplicantLoading = false;
      })
      .addCase(getAllEmployerJobListAsync.pending, (state) => {
        state.isEmployerJobLoading = true;
      })
      
  },
});

export const selectAllEmployerJobList = (state: RootState) => state.EmployerJob.allEmployerJobList;
export const selectSingleEmployerJob = (state: RootState) => state.EmployerJob.singleEmployerJobDetail;
export const selectAllJobApplicantList = (state: RootState) => state.EmployerJob.allJobApplicantList;
export const selectEmployerJobMessage = (state: RootState) => state.EmployerJob.EmployerJobMessage;
export const selectEmployerJobLoading = (state: RootState) => state.EmployerJob.isEmployerJobLoading;
export const { clearEmployerJobMessage } = EmployerJobSlice.actions;
export default EmployerJobSlice.reducer;
