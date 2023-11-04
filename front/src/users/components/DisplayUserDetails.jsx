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
import CustomListItemText from "../../components/CustomListItemText";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

export default function DisplayUserDetails({ displayData, allData }) {
  const [updatedData, setUpdatedData] = useState({ ...displayData });
  const [editingField, setEditingField] = useState(null);
  console.log(allData);
  const handleEditField = (key) => {
    console.log("handleEditField", key);
    if (editingField !== key) {
      setEditingField(key);
      // handleSaveField(key);
    }
  };
  const handleFieldChange = (key, value) => {
    console.log("handleFieldChange");
    setUpdatedData({ ...updatedData, [key]: value });

    console.log(updatedData);
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
      <Card
        sx={{
          height: "100%",
        }}
      >
        <Box width={"100%"} display="flex" flexDirection="column">
          <List sx={{ textAlign: "center" }}>
            {Object.entries(displayData).map(([key, value]) => {
              if (key !== "password") {
                return (
                  <Box key={key}>
                    <CustomListItemText
                      onClickAction={() => handleEditField(key)}
                      key={key}
                      primary={camelCaseToRegular(key)}
                      secondary={
                        editingField == key ? (
                          <Box width={"70%"} margin={"0 auto"}>
                            <TextField
                              size="small"
                              sx={{
                                textAlign: "center",
                                "& input": {
                                  color: "red", // Set the text color of the input field
                                },
                                "& label.Mui-focused": {
                                  color: "green", // Set the text color when focused
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "red", // Set the border color
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "green", // Set the border color when hovered
                                },
                                height: "50px",
                              }}
                              value={updatedData[key]}
                              onChange={(e) =>
                                handleFieldChange(key, e.target.value)
                              }
                            />
                            <Button
                              sx={{ margin: "auto" }}
                              onClick={() => handleSaveField(key)}
                            >
                              <SaveAltIcon />
                            </Button>
                          </Box>
                        ) : (
                          camelCaseToRegular(updatedData[key])
                        )
                      }
                    ></CustomListItemText>
                  </Box>
                );
              }
            })}
          </List>
        </Box>
      </Card>
    </>
  );
}

DisplayUserDetails.propTypes = {
  displayData: PropTypes.object.isRequired,
};
