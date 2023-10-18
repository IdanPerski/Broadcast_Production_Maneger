import { Box, Container, Grid } from "@mui/material";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import Input from "../../forms/components/Input";
import Form from "../../forms/components/Form";
import useForm from "../../forms/hooks/useForm";
import { useUser } from "../providers/UserProvider";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import loginSchema from "../models/joi-schema/loginSchema";
import useUsers from "../hooks/useUsers";
import PageHeader from "../../components/PageHeader";
export default function LoginPage() {
  const { user } = useUser();
  const { handleLogin } = useUsers();

  const { value, ...rest } = useForm(
    initialLoginForm,
    loginSchema,
    handleLogin,
  );

  if (user) return <Navigate replace to={ROUTES.ROOT} />;
  return (
    <>
      <Container>
        <PageHeader title="Broadcast Production Manger" subtitle="Login" />
        <Box
          sx={{
            margin: "0 auto",
            width: "75%",
          }}
        >
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Form
              title="Login"
              onSubmit={rest.onSubmit}
              onReset={rest.handleReset}
              styles={{ maxWidth: "450px" }}
              onChange={rest.validateForm}
              to={ROUTES.ROOT}
            >
              <Input
                label="Email"
                name="email"
                type="email"
                data={value.data}
                error={value.errors.email}
                onChange={rest.handleChange}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                data={value.data}
                error={value.errors.password}
                onChange={rest.handleChange}
              />
            </Form>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
