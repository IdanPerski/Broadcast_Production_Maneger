import jwtDecode from "jwt-decode";

const TOKEN = "token";

export const setTokenInLocalStorage = (encryptedToken) => {
  localStorage.setItem(TOKEN, encryptedToken);
};

export const removeToken = () => localStorage.removeItem(TOKEN);

export const getToken = () => localStorage.getItem(TOKEN);

export const getUser = () => (getToken() ? jwtDecode(getToken()) : null);
