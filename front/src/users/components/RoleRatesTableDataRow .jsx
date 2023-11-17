import {
  Button,
  TableCell,
  TableRow,
  Typography,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteDialog from "../../poductions/components/DeleteDialog";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import camelCaseToRegular from "../../helpers/camelCaseToRegular";
import { useParams } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import { addRoleAndRate, setRate } from "../services/usersApiService";
import formatNameToCamelCase from "../../forms/helpers/formatNameToCamelCase ";
export default function RoleRatesTableDataRow({
  dataProp,
  actions = [],
  onDelete,
}) {
  const [isDialogOpen, setDialog] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [updatedRate, setUpdatedRate] = useState(dataProp.rate);
  const { handleGetMember, value } = useUsers();
  const [component, setNewComponent] = useState(dataProp.role);
  // console.log(component);
  const { userId } = useParams();

  const handleSave = async () => {
    const { member } = value;
    console.log(component);
    if (component.$$typeof && component.props.name === "Roles") {
      const componentRole = dataProp.role.props.data.value;
      handleGetMember(userId);

      const newRoleAndRate = {
        role: formatNameToCamelCase(componentRole),
        rate: updatedRate,
        addRole: true,
      };
      console.log(newRoleAndRate);
      await addRoleAndRate(userId, newRoleAndRate);
      setEditing(false); // To exit edit mode
      setNewComponent(componentRole);
      return;
    } else {
      console.log(value);
      dataProp.rate = updatedRate;
      console.log(dataProp);
      await setRate(userId, dataProp);
      setEditing(false); // To exit edit mode
    }
  };

  console.log(dataProp);

  const handleCancel = () => {
    // Logic for canceling edits
    setEditing(false); // To exit edit mode
  };

  const defaultActions = [
    {
      label: "edit",
      icon: <EditIcon />,
      onClick: () => {
        // Default edit action
        setEditing(true);

        console.log(`Editing row with ID: ${dataProp}`);
      },
    },
    {
      label: "delete",
      icon: <DeleteForeverIcon />,
      onClick: () => {
        // Default delete action
        console.log(`Deleting row with ID: ${dataProp._id}`);
        setDialog(true);
      },
      color: "red",
    },
    {
      label: "Save",
      icon: <SaveAltIcon />,
      onClick: handleSave,
    },
    {
      label: "Cancel",
      icon: <ArrowLeftIcon />,
      onClick: handleCancel,
    },
  ];

  useEffect(() => {
    // console.log(dataProp.value, dataProp, "!!!");
    console.log("useEffect at RoleRatesTableDataRow");
    // console.log(component.props, "component");
    // console.log(dataProp.role);
  }, [handleGetMember, dataProp, handleSave]);

  const allActions = [...defaultActions, ...actions];

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          component="th"
          scope="row"
          sx={{ textAlign: "center", width: "40%" }}
        >
          {/* <Typography variant="body1" color="initial" textAlign={"center"}> */}
          {camelCaseToRegular(dataProp.role) || component}
          {/* </Typography> */}
        </TableCell>

        <TableCell align="center" sx={{ width: "20%" }}>
          {isEditing || component.$$typeof ? (
            <TextField
              type="number"
              value={updatedRate}
              onChange={(e) => setUpdatedRate(e.target.value)}
              sx={{ textAlign: "20%" }}
            />
          ) : (
            <Typography variant="body1" color="initial" textAlign={"center"}>
              {updatedRate === 0 ? dataProp.rate : updatedRate}
            </Typography>
          )}
        </TableCell>

        <TableCell align="center" sx={{ width: "40%" }}>
          {allActions.map((action, index) => {
            if (
              (action.label === "edit" && !isEditing) ||
              (action.label !== "edit" && isEditing) ||
              component.$$typeof
            ) {
              return (
                <Button
                  key={index}
                  onClick={action.onClick}
                  sx={{ color: action.color || "black" }}
                >
                  {action.icon}
                </Button>
              );
            }
            return null; // Render nothing for other cases
          })}
        </TableCell>
      </TableRow>

      <DeleteDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={() => {
          setDialog(false);
        }}
        onDelete={() => {
          console.log(` ${dataProp.role}`);
          setDialog(false);
        }}
        title={`Delete  ${camelCaseToRegular(
          dataProp.role,
        )} role for this member`}
      />
    </>
  );
}
