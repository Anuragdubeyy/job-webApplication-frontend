export const DOMAIN = import.meta.env.VITE_SERVER_DOMAIN + "/api";

export const API_URL = {
    GET_ADMING_LOGIN: DOMAIN + "/auth/login",
}
export const ITEM_PER_PAGE = 50;

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
    JOBSEEKER: "Jobseeker",
    EMPLOYER: "Employer",
  };