import {
  Button,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useProductions from "../hooks/useProductions";
import ProductionCollapsibleContent from "./ProductionCollapsibleContent";
import DeleteProductionDialog from "./DeleteProductionDialog";
export default function ProductionTableDataRow({
  dataProp,
  actions = [],
  onDelete,
}) {
  const [open, setOpen] = useState(false);
  // const [collapseDetails, setCollapseDetails] = useState(null);

  const { handleGetProduction_ForTableCollapsableContent, value } =
    useProductions();

  const [isDialogOpen, setDialog] = useState(false);

  const defaultActions = [
    {
      label: "",
      icon: <EditIcon />,
      onClick: () => {
        // Default edit action

        console.log(`Editing row with ID: ${dataProp._id}`);
      },
    },
    {
      label: "",
      icon: <DeleteForeverIcon />,
      onClick: () => {
        // Default delete action
        console.log(`Deleting row with ID: ${dataProp._id}`);
        setDialog(true);
      },
      color: "red",
    },
  ];

  const allActions = [...defaultActions, ...actions];

  // useEffect(() => {}, [deleteProduction]);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={async () => {
              setOpen(!open);

              if (!open) {
                try {
                  await handleGetProduction_ForTableCollapsableContent(
                    dataProp._id,
                  );
                } catch (error) {
                  console.log(error);
                }
              }
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {dataProp.ascending}
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1" color="initial">
            {dataProp.date}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body1" color="initial">
            {dataProp.locationName}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <div
            style={{ margin: "0 auto" }}
            dangerouslySetInnerHTML={{ __html: dataProp.weatherData }}
          />
        </TableCell>
        <TableCell align="center">
          {allActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              sx={{ color: action.color || "black" }}
            >
              {action.icon} {action.label}
            </Button>
          ))}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ProductionCollapsibleContent data={value} />
          </Collapse>
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
