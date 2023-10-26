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
import DeleteProductionDialog from "./DeleteProductionDialog";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import camelCaseToRegular from "../../helpers/camelCaseToRegular";
export default function RoleRatesTableDataRow({
  dataProp,
  actions = [],
  onDelete,
}) {
  const [isDialogOpen, setDialog] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [updatedRate, setUpdatedRate] = useState(dataProp.rate);

  const handleSave = () => {
    // Logic for saving changes
    dataProp.rate = updatedRate;
    setEditing(false); // To exit edit mode
  };

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
        console.log(`Editing row with ID: ${dataProp._id}`);
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

  const allActions = [...defaultActions, ...actions];

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {camelCaseToRegular(dataProp.role) || dataProp.role}
        </TableCell>

        <TableCell align="center">
          {isEditing ? (
            <TextField
              value={updatedRate}
              onChange={(e) => setUpdatedRate(e.target.value)}
            />
          ) : (
            <Typography variant="body1" color="initial">
              {dataProp.rate}
            </Typography>
          )}
        </TableCell>

        <TableCell align="center">
          {allActions.map((action, index) => {
            if (action.label === "edit" && !isEditing) {
              return (
                <Button
                  key={index}
                  onClick={action.onClick}
                  sx={{ color: action.color || "black" }}
                >
                  {action.icon}
                </Button>
              );
            } else if (action.label !== "edit" && isEditing) {
              return (
                <Button
                  key={index}
                  onClick={action.onClick}
                  sx={{ color: action.color || "black" }}
                >
                  {action.icon}
                </Button>
              );
            } else {
              return null; // Render nothing for other cases
            }
          })}
        </TableCell>
      </TableRow>

      <DeleteProductionDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={() => {
          setDialog(false);
        }}
        onDelete={() => {
          onDelete(dataProp._id);
          setDialog(false);
        }}
      />
    </>
  );
}
