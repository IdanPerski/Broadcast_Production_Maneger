import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Card,
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useUser } from "../providers/UserProvider";
import useUsers from "../hooks/useUsers";
import DisplayUserDetails from "../components/DisplayUserDetails";
import camelCaseToRegular from "../../helpers/camelCaseToRegular";
import DisplayUserRolesAndRates from "../components/DisplayUserRolesAndRates";
import MyTable from "../../components/table/MyTable";
import { sanitizeData } from "../../components/table/helpers/sanitaizeData";
import DynamicTableDataRow from "../../components/table/DynamicTableDataRow";
import RoleRatesTableDataRow from "../../poductions/components/RoleRatesTableDataRow ";
import MultiSelect from "../../forms/components/MultiSelect";
import useForm from "../../forms/hooks/useForm";
import DynamicSelectInput from "../../forms/components/DynamicSelectInput";
import initialAddUserForm from "../helpers/initialForms/initialAddUserForm";
import AddUserSchema from "../models/joi-schema/AddUserSchema";

export default function EditUserPage() {
  const { userId } = useParams();
  const { handleGetMember, value } = useUsers();
  const [newRole, setNewRole] = useState(false);
  const { member } = value;

  const handleAddRole = () => {
    console.log("add role");
    setNewRole(true);
  };

  useEffect(() => {
    handleGetMember(userId);
  }, []);

  // const handleRateSubmit ()=>{

  // }
  const RolesArray = [
    "Audio Engineer",
    "Director",
    "Editor",
    "VTR",
    "CG",
    "Camera Operator",
    "Technician",
    "Producer",
    "Talent",
  ];
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
          options={RolesArray}
          name={"Roles"}
          label={"roles"}
          data={member}
          onChange={(target) => handleChange(target, RolesArray)}
        />
      ),
      rate: "0",
    };

    console.log(member);

    return (
      <Container>
        <PageHeader
          title="User Details"
          subtitle={`${firstName} ${lastName}`}
        />
        <Box sx={{ width: "75%", margin: "0 auto" }}>
          <DisplayUserDetails displayData={name} />
          <DisplayUserDetails displayData={contact.address} />
          <DisplayUserDetails displayData={memberContact} />
          <Typography variant="body1" color="initial" sx={{ m: 2 }}>
            Roles:
          </Typography>
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

          <Button
            sx={{ bgcolor: "black", m: 1 }}
            onClick={() => console.log("submit")}
          >
            Submit
          </Button>
        </Box>
      </Container>
    );
  }
}

/* 


     {roles.map((role, i) => {
              console.log(role.role);
              const rateObject = { rate: String(role.rate) };

              return (
                <Box
                  key={role.role}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {console.log(typeof rateObject.rate)}
                  <Box>
                    <Typography
                      variant="body1"
                      color="initial"
                      textAlign={"center"}
                      sx={{ m: 1 }}
                    >
                      {`${camelCaseToRegular(role.role)}`}
                    </Typography>
                    // {/* <DisplayUserRolesAndRates displayData={rateObject} /> 
                  // </Box>
                // </Box>
            //   );
            // })}

// */
