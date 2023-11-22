import { useState, useCallback, useMemo } from "react";

import {
  editUser,
  getSingleUserFromServer,
  getUsersFromServer,
  login,
  signup,
} from "../services/usersApiService";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useAxios from "../../hooks/useAxios";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useSnack } from "../../providers/SnackBarProvider";
import { useUser } from "../providers/UserProvider";
import {
  getAllUsers,
  getProductionElemnents,
} from "../../poductions/services/productionsApiService";
import EditUserPage from "../pages/EditUserPage";
import setUserIdParamAndNavigate from "../helpers/setUserIdParamsAndNavigate";

const useUsers = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const snack = useSnack();
  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();
  useAxios();

  const [allUsers, setAllUsers] = useState([]);
  const [member, setMember] = useState({});

  const requestStatus = useCallback(
    (loading, errorMessage, user = null) => {
      setLoading(loading);
      setError(errorMessage);
      setUser(user);
    },
    [setUser],
  );

  const handleLogin = useCallback(async (user) => {
    try {
      const token = await login(user);
      setTokenInLocalStorage(token);
      setToken(token);
      const userFromLocalStorage = getUser();
      requestStatus(false, null, userFromLocalStorage);
      // navigate(ROUTES.ROOT);
    } catch (error) {
      console.log("catched error at handleLogin");
      requestStatus(false, error, null);
    }
  });

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]);

  const registerUser = useCallback(
    async (userFromClient) => {
      try {
        const normalizedUser = normalizeUser(userFromClient);
        const signedUser = await signup(normalizedUser);
        snack("success", "User has been successfully Registered");
        requestStatus(false, null, user);
        // setTimeout(() => navigate(ROUTES.EDIT_USER), 2000);
        navigate(`${ROUTES.EDIT_USER}/${signedUser._id}`);
      } catch (error) {
        console.log("register user Error:", error);
        requestStatus(false, error, null);
      }
    },
    [requestStatus, handleLogin],
  );

  const handleUpdateUser = useCallback(
    async (user) => {
      try {
        setLoading(true);
        const userNormalize = normalizeUser(user);
        await editUser(user, userNormalize);

        snack("success", "User has been successfully updated");
        requestStatus(false, null, user);
        // setTimeout(() => navigate(ROUTES.MY_CARDS), 650);
      } catch (error) {
        console.log(error);
      }
    },
    [requestStatus],
  );

  const handleGetMember = useCallback(
    async (id) => {
      if (id) {
        try {
          setLoading(true);
          const member = await getSingleUserFromServer(id);
          setMember(member);
          setLoading(false);
        } catch (error) {
          console.log("error at handleGetMember() in useusers hook");
          console.log(error);
        }
      } else {
        return null;
      }
    },

    [],
  );

  /*
 
UPDATE USER
 



    //handleUpdateCard
  const handleUpdateUser = async (userId) => {
    try {
      setLoading(true);
      const card = await editCard(cardId);
      requestStatus(false, null, null, card);
      snack("success", "The business card has been successfully updated");
    } catch (error) {
      requestStatus(false, error, null);
    }
  };

  
  const handleUpdateUser = async (cardId, cardFromClient) =>{

  }
  
  */

  const handleGetAllUsersRoles = async () => {
    console.log("handleGetAllUsersRoles ON");
    setLoading(true);
    try {
      const data = await getProductionElemnents();
      setAllUsers(data.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({ isLoading, error, user, allUsers, member }),
    [isLoading, error, user, allUsers, member],
  );

  return {
    value,
    handleLogin,
    handleLogout,
    registerUser,
    handleUpdateUser,
    handleGetAllUsersRoles,
    handleGetMember,
  };
};

export default useUsers;
