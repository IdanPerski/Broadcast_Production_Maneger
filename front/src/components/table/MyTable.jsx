import { Table, TableBody, TableContainer } from "@mui/material";
import React from "react";

import DynamicTableDataRow from "./DynamicTableDataRow";
import MyTableHead from "./MyTableHead";

export default function MyTable({
  headRowArray,
  dataRow,
  rowActions,
  children,
}) {
  return (
    <TableContainer>
      <Table>
        <MyTableHead tableHeadArray={headRowArray} />
        <TableBody>
          {!children ? (
            <DynamicTableDataRow data={dataRow || {}} actions={rowActions} />
          ) : (
            children
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
