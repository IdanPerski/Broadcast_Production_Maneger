import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React from "react";
// import InfoIcon from "@mui/icons-material/Info";
// import DashboardIcon from "@mui/icons-material/Dashboard";

export default function Footer() {
  return (
    <BottomNavigation showLabels sx={{ bgcolor: "black" }}>
      <BottomNavigationAction
        sx={{ color: "red" }}
        label="About"
        // icon={<InfoIcon />}
        onClick={() => console.log("about clicked")}
      />

      <BottomNavigationAction
        sx={{ color: "red" }}
        label="something"
        // icon={<DashboardIcon />}
        onClick={() => console.log("sonmething clicked")}
      />
    </BottomNavigation>
  );
}
