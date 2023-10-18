import { Box } from "@mui/material";
import { node } from "prop-types";
import React from "react";
// import { useTheme } from "../../providers/ThemeProvider";

export default function Main({ children, widthLayout, marginLayout }) {
  // const { isDark } = useTheme();
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: widthLayout,
          marginLeft: marginLayout, // Set the width of the sidebar
          // position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          overflow: "auto",
          // backgroundColor: isDark ? "#333333" : "#e3f2fd",
          backgroundColor: "#FAF3E0",
          // color: isDark ? "white" : "#333333",
        }}
      >
        {children}
      </Box>
    </>
  );
}

Main.propTypes = {
  children: node.isRequired,
};
