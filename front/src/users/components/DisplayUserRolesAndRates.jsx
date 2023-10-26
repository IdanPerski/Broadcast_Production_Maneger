import {
  Box,
  Card,
  CardHeader,
  ListItemText,
  Avatar,
  List,
  TextField,
  Button,
  ListItem,
  Container,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { login } from "../services/usersApiService";
import camelCaseToRegular from "../../helpers/camelCaseToRegular";

export default function DisplayUserRolesAndRates({ displayData }) {
  const [updatedData, setUpdatedData] = useState({ ...displayData });
  const [editingField, setEditingField] = useState(null);

  const handleEditField = (key) => {
    console.log("handleEditField");
    if (editingField !== key) {
      setEditingField(key);
    }
  };
  const handleFieldChange = (key, value) => {
    setUpdatedData({ ...updatedData, [key]: value });
  };
  const handleSaveField = (key) => {
    console.log("handleSaveField");
    setEditingField(null); // Switch back to displaying the value
    // You can save the updatedData to your backend or state here'
    displayData[key] = updatedData;

    console.log(updatedData);
    console.log(key);
  };

  return (
    <>
      <Box width={"100%"} display="flex" flexDirection="column" height={"100%"}>
        <List sx={{ textAlign: "center" }}>
          {Object.entries(displayData).map(([key, value]) => {
            if (key !== "password") {
              return (
                <ListItem key={key}>
                  <ListItemText>{camelCaseToRegular(key)}</ListItemText>
                  <ListItemText
                    variant="body2"
                    color="initial"
                    onClick={() => handleEditField(key)}
                  >
                    {editingField == key ? (
                      <TextField
                        value={updatedData[key]}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                      />
                    ) : (
                      camelCaseToRegular(updatedData[key])
                    )}
                  </ListItemText>
                </ListItem>
              );
            }
          })}
        </List>
      </Box>
    </>
  );
}

DisplayUserRolesAndRates.propTypes = {
  displayData: PropTypes.object.isRequired,
};
