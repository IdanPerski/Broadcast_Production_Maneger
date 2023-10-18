import React, { useCallback, useEffect } from "react";
import DynamicSelectInput from "../../forms/components/DynamicSelectInput";
import Form from "../../forms/components/Form";
import { func, object, string } from "prop-types";
import DateInput from "../../forms/components/DateInput";
import { Grid, Typography } from "@mui/material";
// import AddField from "../../forms/components/AddField";
import MultiSelect from "../../forms/components/MultiSelect";
import useFakeData from "../../hooks/useFakeData";
import formatNameToCamelCase from "../../forms/helpers/formatNameToCamelCase ";
import useUsers from "../../users/hooks/useUsers";

const AddProductionForm = ({
  onSubmit,
  onReset,
  errors,
  onInputChange,
  onFormChange,
  data,
  title,
  date,
}) => {
  const { callFakeData, fakeValue } = useFakeData();

  const { handleGetAllUsersRoles, value } = useUsers();

  const { allUsers } = value;
  console.log(value, allUsers);
  const { isLoading, fakeUsers, fakeProdType, fakeLocations } = fakeValue;

  const fitRolesToName = (optionsArray, roleName) => {
    console.log(optionsArray);
    let personRoleArray = [];
    optionsArray.map((person) => {
      const { roles, name } = person;

      roles.map((role) => {
        if (
          role.role === formatNameToCamelCase(roleName) ||
          role.role == roleName
        ) {
          //TODO change the person scheme at the faker to same person schema at the users

          const personFitsToRole = {
            fullName: `${name.firstName} ${name.lastName}`,
            _id: person._id,
            key: role._id + " " + person._id,
          };

          personRoleArray.push(personFitsToRole);
        }
      });
    });

    return !personRoleArray ? null : personRoleArray;
  };

  useEffect(() => {
    callFakeData();
    handleGetAllUsersRoles();
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      errors={errors}
      onChange={onFormChange}
      styles={{ maxWidth: "800px" }}
      formTitle={title}
    >
      <DateInput
        error={errors.date}
        onSubmit={onSubmit}
        onChange={date}
        data={data}
        name="date"
      />

      <DynamicSelectInput
        name="type"
        label="type"
        error={errors.type}
        onChange={onInputChange}
        data={data}
        sm={6}
        options={fakeProdType}
      />
      <DynamicSelectInput
        name="location"
        label="location"
        error={errors.location}
        onChange={onInputChange}
        data={data}
        sm={6}
        options={fakeLocations}
      />

      <Typography
        variant="body1"
        color="initial"
        sx={{ textAlign: "center", width: "100%", mt: 1 }}
      >
        Field crew:
      </Typography>

      <Grid container spacing={0} sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <MultiSelect
            options={fitRolesToName(fakeUsers, "Producer")}
            onChange={onInputChange}
            name={"Producer"}
            data={data}
          />
        </Grid>
      </Grid>

      <Grid container spacing={0} sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <MultiSelect
            options={fitRolesToName(allUsers, "Technician")}
            onChange={onInputChange}
            name={"Technician"}
            data={data}
          />
        </Grid>
      </Grid>

      <Grid container spacing={0} sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <MultiSelect
            options={fitRolesToName(allUsers, "Camera Operator")}
            onChange={onInputChange}
            name={"Camera Operators"}
            data={data}
          />
        </Grid>
      </Grid>

      <Typography
        variant="body1"
        color="initial"
        sx={{ textAlign: "center", width: "100%", mt: 1 }}
      >
        Control crew:
      </Typography>

      <DynamicSelectInput
        name="director"
        label="director"
        error={errors.type}
        onChange={onInputChange}
        data={data}
        sm={6}
        options={fitRolesToName(allUsers, "director")}
      />

      <DynamicSelectInput
        name="Vision Mixer Operator"
        label="Vision Mixer Operator"
        error={errors.type}
        onChange={onInputChange}
        data={data}
        sm={6}
        options={fitRolesToName(allUsers, "vision Mixer Operator")}
      />

      <DynamicSelectInput
        name="cg"
        label="CG"
        error={errors.type}
        onChange={onInputChange}
        data={data}
        sm={6}
        options={fitRolesToName(allUsers, "cg")}
      />
      <DynamicSelectInput
        name="Editor"
        label="Editor"
        error={errors.type}
        onChange={onInputChange}
        data={data}
        sm={6}
        options={fitRolesToName(allUsers, "Editor")}
      />

      <DynamicSelectInput
        name="Audio Engineer"
        label="Audio Engineer"
        error={errors.type}
        onChange={onInputChange}
        data={data}
        sm={6}
        options={fitRolesToName(allUsers, "Audio Engineer")}
      />

      <Grid container spacing={0} sx={{ mt: 3 }}>
        <Grid item xs={9}>
          <MultiSelect
            options={fitRolesToName(fakeUsers, "vtr")}
            onChange={onInputChange}
            name={"vtr"}
            data={data}
          />
        </Grid>
      </Grid>

      <Typography
        variant="body1"
        color="initial"
        sx={{ textAlign: "center", width: "100%", mt: 1 }}
      >
        Talents:
      </Typography>

      <Grid container spacing={0} sx={{ mt: 1 }}>
        <Grid item xs={10}>
          <MultiSelect
            options={fitRolesToName(fakeUsers, "Talent")}
            onChange={onInputChange}
            name={"Talents"}
            data={data}
          />
        </Grid>
      </Grid>
    </Form>
  );
};

AddProductionForm.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  errors: object.isRequired,
  onFormChange: func.isRequired,
  onInputChange: func.isRequired,
  data: object.isRequired,
  title: string.isRequired,
};

export default React.memo(AddProductionForm);
