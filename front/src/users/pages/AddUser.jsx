import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import ROUTES from "../../routes/routesModel";
import RegisterForm from "../components/RegisterForm";
import initialAddUserForm from "../helpers/initialForms/initialAddUserForm";
import useUsers from "../hooks/useUsers";
import AddUserSchema from "../models/joi-schema/AddUserSchema";
import { useUser } from "../providers/UserProvider";
import PageHeader from "../../components/PageHeader";

export default function AddUSer() {
  // const user = true;

  const { registerUser } = useUsers();

  const { value, ...rest } = useForm(
    initialAddUserForm,
    AddUserSchema,
    registerUser,
  );

  console.log(value);

  const roles = [
    "CG",
    "Editor",
    "Audio Engineer",
    "visionMixerOperator",
    "Director",
  ];

  const { user } = useUser();
  // if (!user) return <Navigate replace to={ROUTES.LOGIN_PAGE} />;
  return (
    <>
      <Container>
        <PageHeader title="Register" subtitle="Add New User" />
        <Box
          sx={{
            margin: "0 auto",
            width: "75%",
          }}
        >
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <RegisterForm
              onSubmit={rest.onSubmit}
              onReset={rest.handleReset}
              onFormChange={rest.validateForm}
              errors={value.errors}
              title=""
              onInputChange={(target) => rest.handleChange(target, roles)}
              setData={rest.setData}
              data={value.data}
            />
          </Grid>
        </Box>
      </Container>
    </>
  );
}
