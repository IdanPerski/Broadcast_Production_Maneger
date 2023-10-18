import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function DynamicTableDataRow({ data }) {
  const sanitizedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      return [key, key === "_id" ? "" : value];
    }),
  );

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {Object.values(sanitizedData).map((value, index) => {
          return (
            <TableCell key={index} align="center">
              <Typography variant="body2" color="initial">
                {value}
              </Typography>
            </TableCell>
          );
        })}
      </StyledTableRow>
    </>
  );
}
