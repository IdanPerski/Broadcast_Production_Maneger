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
import { useParams } from "react-router-dom";
import useUsers from "../../users/hooks/useUsers";
export default function RoleRatesTableDataRow({
  dataProp,
  actions = [],
  onDelete,
}) {
  const [isDialogOpen, setDialog] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [updatedRate, setUpdatedRate] = useState(dataProp.rate);
  const { handleGetMember, value } = useUsers();

  const { userId } = useParams();

  const handleSave = () => {
    console.log("handleSave");
    if (dataProp.role.props && dataProp.role.props.name === "Roles") {
      handleGetMember(userId);
      const { member } = value;
      console.log(value);
    }
    // Logic for saving changes
    handleGetMember(userId);
    console.log(value);
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

  useEffect(() => {
    // console.log(dataProp.value, dataProp, "!!!");
    console.log("useEffect at RoleRatesTableDataRow");
  }, [handleSave, handleGetMember]);

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
          {camelCaseToRegular(dataProp.role) || dataProp.role}
          {/* </Typography> */}
        </TableCell>

        <TableCell align="center" sx={{ width: "20%" }}>
          {isEditing ? (
            <TextField
              value={updatedRate}
              onChange={(e) => setUpdatedRate(e.target.value)}
              sx={{ textAlign: "20%" }}
            />
          ) : (
            <Typography variant="body1" color="initial" textAlign={"center"}>
              {dataProp.rate}
            </Typography>
          )}
        </TableCell>

        <TableCell align="center" sx={{ width: "40%" }}>
          {allActions.map((action, index) => {
            if (
              (action.label === "edit" && !isEditing) ||
              (action.label !== "edit" && isEditing)
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
