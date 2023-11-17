import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Container, Paper } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useUser } from "../providers/UserProvider";
import useUsers from "../hooks/useUsers";

import MyTable from "../../components/table/MyTable";
import RoleRatesTableDataRow from "../components/RoleRatesTableDataRow ";
import useForm from "../../forms/hooks/useForm";
import DynamicSelectInput from "../../forms/components/DynamicSelectInput";
import initialAddUserForm from "../helpers/initialForms/initialAddUserForm";
import AddUserSchema from "../models/joi-schema/AddUserSchema";
import UserPersonalDetails from "../components/UserPersonalDetails";
import mergeArraysExcludingSimilar from "../../helpers/mergeArraysExcludingSimilar";
import camelCaseToRegular from "../../helpers/camelCaseToRegular";
import formatNameToCamelCase from "../../forms/helpers/formatNameToCamelCase ";

export default function EditUserPage() {
  const { userId } = useParams();
  const { handleGetMember, value } = useUsers();
  const [newRole, setNewRole] = useState(false);
  const [newRoleRowValue, setnNewRoleRowValue] = useState({});
  const [optianlRoles, setOptionalRoles] = useState([]);
  const { member } = value;

  const rolesArray = [
    "audioEngineer",
    "director",
    "editor",
    "vTR",
    "CG",
    "cameraOperator",
    "technician",
    "producer",
    "talent",
  ];

  const handleAddRole = () => {
    console.log("add role");
    setNewRole(true);
    const { roles } = member;
    if (roles) {
      const memberRolesList = roles.map((roleObj) => roleObj.role);

      setOptionalRoles(
        mergeArraysExcludingSimilar(rolesArray, memberRolesList),
      );
    }
  };

  useEffect(() => {
    handleGetMember(userId);
  }, []);

  // const handleRateSubmit ()=>{

  // }

  const { handleChange } = useForm(initialAddUserForm, AddUserSchema, () => {
    console.log("submit form");
  });

  const { user } = useUser();

  if (member.name) {
    const { firstName, lastName } = member.name;
    const { name, contact, roles } = member;

    const { email, phoneNumber } = member.contact;
    const memberContact = {
      email: email,
      phoneNumber: phoneNumber,
    };

    const newRoleRowData = {
      role: (
        <DynamicSelectInput
          options={optianlRoles.map((role) => camelCaseToRegular(role))}
          name={"Roles"}
          label={"roles"}
          data={newRoleRowValue}
          onChange={(e) => {
            console.log(e.target);
            if (e.target.role) {
              e.target.role = formatNameToCamelCase(e.target.role);
            }
            setnNewRoleRowValue(e.target);
            // handleChange(e, rolesArray);
          }}
        />
      ),
      rate: "0",
    };

    // console.log(newRoleRowData);

    return (
      <Container>
        <PageHeader
          title="User Details"
          subtitle={`${firstName} ${lastName}`}
        />

        <Box
          sx={{
            width: "100%",
            margin: "0 auto",
            display: "flex",
          }}
        >
          <UserPersonalDetails
            name={name}
            contact={memberContact}
            address={contact.address}
          />

          <Paper sx={{ ml: 1, height: "50%", width: "70%" }}>
            <MyTable headRowArray={["Roles", "Rate", "Actions"]}>
              {roles.map((role, i) => {
                return <RoleRatesTableDataRow dataProp={role} key={i} />;
              })}
              {newRole ? (
                <RoleRatesTableDataRow dataProp={newRoleRowData} />
              ) : null}
            </MyTable>
            <Button sx={{ bgcolor: "black", m: 1 }} onClick={handleAddRole}>
              add role
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }
}
