import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTES from "./routesModel";
import AddProduction from "../poductions/pages/AddProduction";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../users/pages/LoginPage";
import MembersList from "../users/pages/MembersList";
import AddUser from "../users/pages/AddUser";
import EditUserPage from "../users/pages/EditUserPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.ADD_PROD} element={<AddProduction />} />
      <Route path={ROUTES.ROOT} element={<HomePage />} />
      <Route path={ROUTES.LOGIN_PAGE} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<AddUser />} />
      <Route path={`${ROUTES.EDIT_USER}/:userId`} element={<EditUserPage />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
