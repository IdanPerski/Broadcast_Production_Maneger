import { node } from "prop-types";
import React from "react";

// import { MenuProvider } from "./header/topNavBar/menu class/menu/MenuProvider";

import Main from "./main/Main";
import SideDrawer from "./Side/SideDrawer";
import { useMediaQuery, useTheme } from "@mui/material";

export default function SideBarLayout({ children }) {
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const sideBarWidth = isSmallerScreen ? "100px" : "200px";
  return (
    <>
      <SideDrawer drawerWidth={sideBarWidth} sideBarTitle={"SPM"} />
      <Main
        widthLayout={`calc(100%-${sideBarWidth})`}
        marginLayout={sideBarWidth}
      >
        {children}
      </Main>
    </>
  );
}

SideBarLayout.propTypes = {
  children: node.isRequired,
};
