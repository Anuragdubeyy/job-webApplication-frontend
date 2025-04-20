import { Building2Icon, Contact, LayoutDashboard } from "lucide-react";

export const DOMAIN = import.meta.env.VITE_SERVER_DOMAIN + "/api";

export const API_URL = {
    GET_ADMING_LOGIN: DOMAIN + "/auth/login",
    GET_ALL_JOB: DOMAIN + "/users/jobs",
    GET_SINGLE_JOB_DETAILS: (id: string) => DOMAIN + `/users/jobs/${id}`,
    GET_EMPLOYER_JOB_POST: DOMAIN + "/employers/jobs",
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
      to: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      label: "Contact",
      to: "/contact",
      icon: <Contact />,
    },
    {
      label: "Company",
      to: "/company",
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
      label: "Contact",
      to: "/employer/jobPost",
      icon: <Contact />,
    },
    {
      label: "Company",
      to: "/company",
      icon: <Building2Icon />,
    },
    

    
  ];