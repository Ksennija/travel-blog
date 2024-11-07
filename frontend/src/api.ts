import axios from "axios";

export const baseImgUrl = "//localhost:3001/img";

export const api = axios.create({
    baseURL: "//localhost:3001/api/",
    withCredentials: false,
  });
  
  export const fetchCountries = () => {
    const allCountries = api
      .get("/countries")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
    
    return allCountries;
  };


