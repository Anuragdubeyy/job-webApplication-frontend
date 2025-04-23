import { Building2Icon, Contact, LayoutDashboard } from "lucide-react";

export const DOMAIN = import.meta.env.VITE_SERVER_DOMAIN + "/api";

export const API_URL = {
    GET_ADMING_LOGIN: DOMAIN + "/auth/login",
    GET_USER_REGISTER: DOMAIN + "/auth/register",
    GET_ALL_JOB: DOMAIN + "/users/jobs",
    GET_SINGLE_JOB_DETAILS: (id: string) => DOMAIN + `/users/jobs/${id}`,
    GET_EMPLOYER_JOB_POST: DOMAIN + "/employers/jobs",
    POST_APPLY_FOR_JOB:(id: string) => DOMAIN + `/users/jobs/apply/${id}`,
    POST_NEW_JOB: DOMAIN + "/employers/jobs/create",
    GET_ALL_APPLICANT: DOMAIN + `/employers/jobs/applicants`,
    GET_ALL_APPLICANT_BY_POST:(id: string) => DOMAIN + `/employers/jobs/applicants/${id}`,
    GET_ALL_JOB_APPLIED_BY_JOBSEEKER: DOMAIN + `/users/applications`,
}
export const ITEM_PER_PAGE = 20;

export type RowType = {
    getIsSelected: () => boolean;
    toggleSelected: (value: boolean) => void;
    getValue: (key: string) => any;
    original: any;
    index: number;
    [key: string]: any;
  };

  export interface RowTypee {
    [key: string]: any;
  }

  export const USER_TYPE = {
    JOBSEEKER: "jobseeker",
    EMPLOYER: "employer",
  };

  export const leftSideBarLinks = [
    {
      label: "Dashboard",
      to: "/jobseeker/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      label: "Jobs",
      to: "/jobseeker/jobs",
      icon: <Contact />,
    },
    {
      label: "Job Applied",
      to: "/jobseeker/applied-jobs",
      icon: <Building2Icon />,
    },
    

    
  ];
  export const EmployerLeftSideBarLinks = [
    {
      label: "Dashboard",
      to: "/employer/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      label: "Job Posted",
      to: "/employer/jobPost",
      icon: <Contact />,
    },
    {
      label: "JOb Applicants",
      to: "/employer/jobApplicant",
      icon: <Building2Icon />,
    },
    

    
  ];