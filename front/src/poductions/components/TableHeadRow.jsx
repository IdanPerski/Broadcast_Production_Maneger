import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

export default function TableHeadRow({ tableHeadArray }) {
  return (
    <TableHead sx={{ fontWeight: "100" }}>
      <TableRow>
        <TableCell sx={{ width: "5%", textAlign: "center" }} />
        <TableCell sx={{ width: "5%", textAlign: "center" }}>#</TableCell>
        {tableHeadArray?.map((head) => (
          <TableCell key={head} sx={{ textAlign: "center" }}>
            {head}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
