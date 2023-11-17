import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const login = async (user) => {
  try {
    const { data } = await axios.post(`${apiUrl}/users/login`, user);
    return data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.message);
  }
};

export const signup = async (normalizedUser) => {
  try {
    const { data } = await axios.post(`${apiUrl}/register`, normalizedUser);
    console.log(data, "DATA");
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getUsersFromServer = async (userId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/users/${userId}`);

    return data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.message);
  }
};
export const getSingleUserFromServer = async (userId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/editUser/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.message);
  }
};

export const editUser = async (user, normalizedUser) => {
  try {
    const { data } = await axios.put(`${apiUrl}/users/${user}`, normalizedUser);
    return data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.message);
  }
};
export const setRate = async (userId, roleAndRateObject) => {
  try {
    const { data } = await axios.patch(
      `${apiUrl}/editUser/${userId}`,
      roleAndRateObject,
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error, "ERROR SETRATE");
    return Promise.reject(error.message);
  }
};
export const addRoleAndRate = async (userId, roleAndRateObject) => {
  try {
    const { data } = await axios.patch(
      `${apiUrl}/editUser/${userId}`,
      roleAndRateObject,
    );
    console.log(data);
    console.log("addRoleAndRate");
    return data;
  } catch (error) {
    console.log(error, "ERROR SETRATE");
    return Promise.reject(error.message);
  }
};
