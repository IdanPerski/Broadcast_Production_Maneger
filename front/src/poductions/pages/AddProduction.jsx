import React, { useEffect } from "react";
import AddProductionForm from "../components/AddProductionForm";
import initialProductionForm from "../helpers/initialForms/initialProductionForm";
import productionSchema from "../models/joi-schema/productionSchema";
import normalizeProduction from "../helpers/normalization/normalizeProduction";
import useProductions from "../hooks/useProductions";
import useForm from "../../forms/hooks/useForm";
import { Container } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
// import testCallServer from "../hooks/useProductions";
// import ROUTES from "../../routes/routesModel";

export default function AddProduction() {
  const { handleSetProductionCrew } = useProductions();

  const navivgate = useNavigate();
  const { value, ...rest } = useForm(
    initialProductionForm,
    productionSchema,
    () => {
      const newProduction = {
        ...normalizeProduction(value.data),
        user_id: "admin", //TODO- bring user details to the relevant page and send them to the server
      };

      handleSetProductionCrew(newProduction);
      navivgate(ROUTES.ROOT);
    },
  );

  const roles = [
    "type",
    "location",
    "cg",
    "editor",
    "audioEngineer",
    "visionMixerOperator",
    "director",
  ];

  useEffect(() => {
    // testCallServer();

    return console.log(value);
  }, [value]);

  return (
    <Container sx={{ width: "70vw" }}>
      <AddProductionForm
        title={"add production"}
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        errors={value.errors}
        onFormChange={rest.validateForm}
        onInputChange={(target) => rest.handleChange(target, roles)}
        date={rest.handleDateInput}
        data={value.data}
      />
    </Container>
  );
}
