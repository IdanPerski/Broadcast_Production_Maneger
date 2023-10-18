import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const getFromDatabase = async (getData, errorCatch) => {
  try {
    const { data } = await getData(); // call
    return data;
  } catch (error) {
    console.log(errorCatch);
    console.log(error);
    return Promise.reject(error.message);
  }
};

export const getFakeData = () => {
  return getFromDatabase(
    () => axios.get(`${apiUrl}/addProduction`),
    "getFakeData error",
  );
};
export const getProductionElemnents = () => {
  return getFromDatabase(
    () => axios.get(`${apiUrl}/addProduction`),
    "getFakeData error",
  );
};

export const getProductions = () =>
  getFromDatabase(() => axios.get(`${apiUrl}/`), "getProductions error");

export const getProductionsForMainTable = () =>
  getFromDatabase(
    () => axios.get(`${apiUrl}/`),
    "getProductionsForMainTable error",
  );

export const createProduction = (production) => {
  return getFromDatabase(
    () => axios.post(`${apiUrl}/addProduction`, production),
    "set production error",
  );
};

export const deleteProduction = (productionId) => {
  console.log(productionId);
  return getFromDatabase(
    () => axios.delete(`${apiUrl}/${productionId}`),
    "deleteProduction error",
  );
};
export const getProductionForCollapeTable_ById = (productionId) => {
  return getFromDatabase(
    () => axios.get(`${apiUrl}/${productionId}`),
    "getProductionForCollapeTable_ById error",
  );
};
