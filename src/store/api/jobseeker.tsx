import axios from "axios";
import { API_URL } from "../../constant";

export function getAllJobList() {
    return new Promise(async (resolve, reject) => {
      try {
        const token = localStorage.getItem('jobToken');
        const response = await axios.get(API_URL.GET_ALL_JOB,{
          headers: {
            Authorization: `Bearer ${token}`,
            // Admin_id: localStorage.getItem('userId'),
          },
          
        });
        console.log(localStorage.getItem('bearer jobToken'))
        if (response.status === 401) {
          localStorage.clear();
          reject(response.data);
          window.location.href = '/';
        }
  
        resolve({ data: response.data });
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      }
    });
  }

  export function getSingleJob(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = localStorage.getItem('jobToken');
        const response = await axios.get(API_URL.GET_SINGLE_JOB_DETAILS(id),{
          headers: {
            Authorization: `Bearer ${token}`,
            // Admin_id: localStorage.getItem('userId'),
          },
          
        });
        console.log(localStorage.getItem('bearer jobToken'))
        if (response.status === 401) {
          localStorage.clear();
          reject(response.data);
          window.location.href = '/';
        }
  
        resolve({ data: response.data });
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      }
    });
  }

  export function getAllJobAppliedByUserList() {
    return new Promise(async (resolve, reject) => {
      try {
        const token = localStorage.getItem('jobToken');
        const response = await axios.get(API_URL.GET_ALL_JOB_APPLIED_BY_JOBSEEKER,{
          headers: {
            Authorization: `Bearer ${token}`,
            // Admin_id: localStorage.getItem('userId'),
          },
          
        });
        console.log(localStorage.getItem('bearer jobToken'))
        if (response.status === 401) {
          localStorage.clear();
          reject(response.data);
          window.location.href = '/';
        }
  
        resolve({ data: response.data });
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      }
    });
  }