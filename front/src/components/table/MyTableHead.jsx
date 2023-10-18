import React from "react";
import { Divider, TableCell, TableHead, TableRow } from "@mui/material";

export default function MyTableHead({ tableHeadArray }) {
  return (
    <TableHead sx={{ borderBottom: "solid 2px" }}>
      <TableRow>
        {tableHeadArray?.map((head) => (
          <TableCell
            key={head}
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {head}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
