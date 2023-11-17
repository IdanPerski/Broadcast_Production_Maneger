import { Box } from "@mui/material";
import React from "react";
import DisplayUserDetails from "./DisplayUserDetails";

export default function UserPersonalDetails({ name, address, contact }) {
  return (
    <Box height={"50%"} width={"30%"} sx={{ border: "solid 1px" }}>
      <DisplayUserDetails displayData={name} />
      <DisplayUserDetails displayData={address} />
      <DisplayUserDetails displayData={contact} />
    </Box>
  );
}
