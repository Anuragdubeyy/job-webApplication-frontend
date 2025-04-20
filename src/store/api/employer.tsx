import axios from "axios";
import { API_URL } from "../../constant";

 export function getAllEmployerJobPost() {
    return new Promise(async (resolve, reject) => {
      try {
        const token = localStorage.getItem('jobToken');
        const response = await axios.get(API_URL.GET_EMPLOYER_JOB_POST,{
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